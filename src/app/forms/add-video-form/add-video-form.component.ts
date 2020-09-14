import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Video } from 'src/app/models/video';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Match } from 'src/app/models/match';
import { HttpErrorResponse } from '@angular/common/http';
import { AddVideoService } from './add-video.service';
import { characters } from '../../models/constants';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-video-form',
  templateUrl: './add-video-form.component.html',
  styleUrls: ['./add-video-form.component.scss']
})
export class AddVideoFormComponent implements OnInit {

  @Output() newVideo = new EventEmitter<Video>();
  showError = false;
  showSpinner = false;
  filteredP1Players: Observable<string[]>;
  filteredP2Players: Observable<string[]>;

  addVideoForm: FormGroup;
  characters = characters;

  constructor(private addVideoService: AddVideoService, private fb: FormBuilder, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.addVideoForm = this.fb.group({
      youtubeId: ['', Validators.required],
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
    return this.sharedService.playerList.filter(player => player.toLowerCase().includes(filterValue));
  }

  private updateFilterLists(playerListExists: boolean): void {
    if (playerListExists) {
    this.filteredP1Players = this.addVideoForm.get('playerOneName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredP2Players = this.addVideoForm.get('playerTwoName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    } else {
      this.filteredP1Players = new Observable<string[]>();
      this.filteredP2Players = new Observable<string[]>();
    }
  }

  addVideo(): void {
    const match: Array<Match> = [{
      matchId: null,
      playerOneName: this.addVideoForm.get('playerOneName').value,
      playerOneChar: this.addVideoForm.get('playerOneChar').value,
      playerTwoName: this.addVideoForm.get('playerTwoName').value,
      playerTwoChar: this.addVideoForm.get('playerTwoChar').value,
      youtubeTimestamp: this.addVideoForm.get('youtubeTimestamp').value,
      video: null
    }];
    const video: Video = {
      videoId: null,
      youtubeId: this.addVideoForm.get('youtubeId').value,
      metadata: null,
      matches: match
    };
    this.showSpinner = true;
    this.addVideoService.addVideo(video).subscribe((data: Video) => {
      this.showSpinner = false;
      this.addVideoForm.reset();
      this.addVideoForm.clearValidators();
      this.addedVideo(data);
      this.sharedService.checkForNewPlayers(match[0].playerOneName, match[0].playerTwoName);
    }, (error: HttpErrorResponse) => {
      this.showSpinner = false;
      this.showError = true;
      console.error('Error adding video: ', error.message);
    });
  }

  addedVideo(video: Video): void {
    this.newVideo.emit(video);
  }

}
