import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Match } from '../../models/match';
import { HttpErrorResponse } from '@angular/common/http';
import { Video } from '../../models/video';
import { AddMatchService } from './add-match.service';
import { characters } from 'src/app/models/constants';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-match-form',
  templateUrl: './add-match-form.component.html',
  styleUrls: ['./add-match-form.component.scss'],
  providers: [AddMatchService]
})
export class AddMatchFormComponent implements OnInit {

  @Input() videoId: number;
  @Output() newMatch = new EventEmitter<Video>();
  filteredP1Players: Observable<string[]>;
  filteredP2Players: Observable<string[]>;
  addMatchForm: FormGroup;
  characters = characters;

  constructor(private addMatchService: AddMatchService, private fb: FormBuilder, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.addMatchForm = this.fb.group({
      playerOneName: ['', Validators.required],
      playerTwoName: ['', Validators.required],
      playerOneChar: ['', Validators.required],
      playerTwoChar: ['', Validators.required],
      youtubeTimestamp: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]{1,}[h]{1}[0-5]{1}[0-9]{1}[m]{1}[0-5]{1}[0-9]{1}[s]$/)
      ])]
    });
    if (this.sharedService.playerListExists()) {
      this.updateFilterLists(true);
    }
    this.sharedService.playerListChanged.subscribe(() => {
      this.updateFilterLists(this.sharedService.playerListExists());
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sharedService.playerListExists() ?
      this.sharedService.playerList.filter(player => player.toLowerCase().includes(filterValue)) : [];
  }

  private updateFilterLists(playerListExists: boolean): void {
    if (playerListExists) {
      this.filteredP1Players = this.addMatchForm.get('playerOneName').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      this.filteredP2Players = this.addMatchForm.get('playerTwoName').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
    } else {
      this.filteredP1Players = new Observable<string[]>();
      this.filteredP2Players = new Observable<string[]>();
    }
  }

  addMatch(): void {
    const match: Match = {
      matchId: null,
      playerOneName: this.addMatchForm.get('playerOneName').value,
      playerTwoName: this.addMatchForm.get('playerTwoName').value,
      playerOneChar: this.addMatchForm.get('playerOneChar').value,
      playerTwoChar: this.addMatchForm.get('playerTwoChar').value,
      youtubeTimestamp: this.addMatchForm.get('youtubeTimestamp').value,
      video: null
    };
    this.addMatchService.addMatch(this.videoId, match).subscribe((data: Video) => {
      this.sharedService.checkForNewPlayers(match.playerOneName, match.playerTwoName);
      this.updateFilterLists(this.sharedService.playerListExists());
      this.addMatchForm.reset();
      this.addMatchForm.clearValidators();
      this.addedMatch(data);
    }, (error: HttpErrorResponse) => {
      console.error('Error adding match: ', error.message);
    });
  }

  addedMatch(video: Video): void {
    this.newMatch.emit(video);
  }

}
