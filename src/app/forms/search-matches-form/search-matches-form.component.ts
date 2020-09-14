import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { characters } from 'src/app/models/constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-matches-form',
  templateUrl: './search-matches-form.component.html',
  styleUrls: ['./search-matches-form.component.scss'],
})
export class SearchMatchesFormComponent implements OnInit {

  searchMatchesForm: FormGroup;
  characters = characters;

  @Output() matchSearch = new EventEmitter<FormGroup>();
  @Input() p1: string;
  @Input() p2: string;
  filteredP1Players: Observable<string[]>;
  filteredP2Players: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.searchMatchesForm = this.fb.group({
      playerOneName: [this.p1 || ''],
      playerTwoName: [this.p2 || ''],
    });
    this.searchMatchesForm.setValidators(this.atLeastOneRequiredValidator);
    if (this.sharedService.playerListExists()) {
      this.updateFilterLists(true);
    }
    this.sharedService.playerListChanged.subscribe(() => {
      this.updateFilterLists(this.sharedService.playerListExists());
    });
    this.searchMatchesForm.updateValueAndValidity();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sharedService.playerList.filter(player => player.toLowerCase().includes(filterValue));
  }

  private updateFilterLists(playerListExists: boolean): void {
    if (playerListExists) {
    this.filteredP1Players = this.searchMatchesForm.get('playerOneName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredP2Players = this.searchMatchesForm.get('playerTwoName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    } else {
      this.filteredP1Players = new Observable<string[]>();
      this.filteredP2Players = new Observable<string[]>();
    }
  }

  private atLeastOneRequiredValidator(formGroup: FormGroup): { atLeastOneRequired: { text: string } } {
    const controls = formGroup.controls;
    if (controls) {
      const oneIsDirty = Object.keys(controls).some(key => controls[key].dirty);
      const oneHasValue = Object.keys(controls).some(key => controls[key].value !== '');
      if (!oneHasValue && oneIsDirty) {
        return {
          atLeastOneRequired: {
            text: 'At least one field is required'
          }
        };
      } else if (!(oneHasValue || oneIsDirty)) {
        return {
          atLeastOneRequired: {
            text: ''
          }
        };
      }
    }
    return null;
  }

  searchMatches(): void {
    if (!this.router.url.endsWith('/search')) {
      this.router.navigate(['/search', {
          p1: this.searchMatchesForm.get('playerOneName').value || '',
          p2: this.searchMatchesForm.get('playerTwoName').value || ''
        }]
      );
    }
    this.matchSearch.emit(this.searchMatchesForm);
  }

}
