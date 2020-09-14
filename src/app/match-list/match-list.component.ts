import { Component, OnInit } from '@angular/core';
import { Match } from '../models/match';
import { HttpErrorResponse } from '@angular/common/http';
import { Video } from '../models/video';
import { MatchListService } from './match-list.service';
import { RetrieveMatchesResponse } from '../models/retrieve-matches-response';
import { PageEvent } from '@angular/material/paginator';
import { RetrieveMatchesRequest } from '../models/retrieve-matches-request';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  showSpinner = false;

  // paginator configuration
  resultsLength = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];

  // request object for the API
  retrieveMatchesRequest: RetrieveMatchesRequest = {
    page: 0,
    pageSize: this.pageSize,
    playerOneName: '',
    playerTwoName: ''
  };

  matches: Array<Match> = [];
  videoByVideoIdMap = new Map<number, Video>();
  matchVideoMap = new Map<Match, Video>();
  videoSet: Set<Video> = new Set<Video>();
  videos: Video[] = [];

  constructor(public matchListService: MatchListService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.retrieveMatchesRequest.playerOneName = params.get('p1') || '';
      this.retrieveMatchesRequest.playerTwoName = params.get('p2') || '';
    });
  }

  ngOnInit(): void {
    if (this.retrieveMatchesRequest.playerOneName || this.retrieveMatchesRequest.playerTwoName) {
      this.retrieveMatches();
    }
  }

  retrieveMatches(): void {
    this.showSpinner = true;
    this.videos = [];
    this.videoSet = new Set<Video>();
    this.matchListService.retrieveMatches(this.retrieveMatchesRequest).subscribe((response: RetrieveMatchesResponse) => {
      this.matches = response.matches;
      this.resultsLength = response.totalResults;
      for (const match of this.matches) {
        if (match.video.videoId) {
          this.videoByVideoIdMap.set(match.video.videoId, match.video);
          this.videoSet.add(match.video);
        }
        this.matchVideoMap.set(match, this.resolveVideoFromMatch(match));
      }
      this.videos = Array.from(this.videoSet).filter((video) => video.matches.length > 0);
      this.videos.forEach((video) => {
        video.matches = this.matches.filter((match) => {
          return match.video.videoId === video.videoId || match.video === video.videoId;
        });
      });
      this.showSpinner = false;
    }, (error: HttpErrorResponse) => {
      this.showSpinner = false;
      console.error('Error retrieving matches: ', error.message);
    });
  }

  searchMatches($event: FormGroup): void {
    this.retrieveMatchesRequest = {
      page: 0,
      pageSize: this.pageSize,
      playerOneName: $event.get('playerOneName').value || '',
      playerTwoName: $event.get('playerTwoName').value || ''
    };
    this.retrieveMatches();
  }

  searchMatchesFromCard(player: string): void {
    this.retrieveMatchesRequest = {
      page: 0,
      pageSize: this.pageSize,
      playerOneName: player || '',
      playerTwoName: ''
    };
    this.retrieveMatches();
  }

  pageChanged($event: PageEvent): void {
    this.retrieveMatchesRequest.page = $event.pageIndex;
    this.retrieveMatchesRequest.pageSize = $event.pageSize;
    this.retrieveMatches();
  }

  backToVideos(): void {
    this.router.navigate(['/videos']);
  }

  private resolveVideoFromMatch(match: Match): Video {
    return match.video.videoId ? match.video : this.videoByVideoIdMap.get(match.video);
  }

}
