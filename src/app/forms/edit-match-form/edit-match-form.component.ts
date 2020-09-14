import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { startWith, map } from 'rxjs/operators';
import { characters } from '../../models/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-edit-match-form',
  templateUrl: './edit-match-form.component.html',
  styleUrls: ['./edit-match-form.component.scss']
})
export class EditMatchFormComponent implements OnInit {

  filteredP1Players: Observable<string[]>;
  filteredP2Players: Observable<string[]>;
  characters = characters;
  editMatchForm: FormGroup;
  @Input() match: Match;
  @Input() showDivider: boolean;
  @Output() deletedMatchEvent = new EventEmitter<Match>();
  @Output() updatedMatchEvent = new EventEmitter<Match>();

  constructor(public sharedService: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editMatchForm = this.fb.group({
      playerOneName: [this.match.playerOneName, Validators.required],
      playerTwoName: [this.match.playerTwoName, Validators.required],
      playerOneChar: [this.match.playerOneChar, Validators.required],
      playerTwoChar: [this.match.playerTwoChar, Validators.required],
      youtubeTimestamp: [this.match.youtubeTimestamp, Validators.compose([
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
    this.filteredP1Players = this.editMatchForm.get('playerOneName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredP2Players = this.editMatchForm.get('playerTwoName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    } else {
      this.filteredP1Players = new Observable<string[]>();
      this.filteredP2Players = new Observable<string[]>();
    }
  }

  deletedMatch(): void {
    this.deletedMatchEvent.emit(this.match);
  }

  updatedMatch(): void {
    this.match.playerOneChar = this.editMatchForm.get('playerOneChar').value;
    this.match.playerOneName = this.editMatchForm.get('playerOneName').value;
    this.match.playerTwoChar = this.editMatchForm.get('playerTwoChar').value;
    this.match.playerTwoName = this.editMatchForm.get('playerTwoName').value;
    this.match.youtubeTimestamp = this.editMatchForm.get('youtubeTimestamp').value;
    this.updatedMatchEvent.emit(this.match);
    this.editMatchForm.markAsPristine();
    this.editMatchForm.updateValueAndValidity();
  }

  swapPlayers(): void {
    const p1Name = this.editMatchForm.get('playerOneName');
    const p2Name = this.editMatchForm.get('playerTwoName');
    const p1Char = this.editMatchForm.get('playerOneChar');
    const p2Char = this.editMatchForm.get('playerTwoChar');
    const tempP1Name = p1Name.value;
    const tempP2Name = p2Name.value;
    const tempP1Char = p1Char.value;
    const tempP2Char = p2Char.value;
    p1Name.patchValue(tempP2Name);
    p1Char.patchValue(tempP2Char);
    p2Name.patchValue(tempP1Name);
    p2Char.patchValue(tempP1Char);
    this.editMatchForm.markAsDirty();
    this.editMatchForm.updateValueAndValidity();
  }

}
