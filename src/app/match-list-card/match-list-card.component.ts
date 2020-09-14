import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Match } from '../models/match';
import { Metadata } from '../models/metadata';
import { SessionManagementService } from '../session-management.service';

@Component({
  selector: 'app-match-list-card',
  templateUrl: './match-list-card.component.html',
  styleUrls: ['./match-list-card.component.scss']
})
export class MatchListCardComponent {

  @Input() match: Match;
  @Input() videoMetadata: Metadata;
  @Output() playerClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(public sessionManagementService: SessionManagementService) {}

  searchPlayer(player: string): void {
    this.playerClicked.emit(player);
  }

}
