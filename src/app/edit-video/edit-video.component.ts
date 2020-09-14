import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../models/video';
import { Match } from '../models/match';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  @Input() video: Video;
  @Output() deletedMatchEvent = new EventEmitter<Match>();
  @Output() updatedMatchEvent = new EventEmitter<Match>();
  constructor() { }

  ngOnInit(): void {
  }

  deletedMatch($event: Match): void {
    this.deletedMatchEvent.emit($event);
  }

  updatedMatch($event: Match): void {
    this.updatedMatchEvent.emit($event);
  }

}
