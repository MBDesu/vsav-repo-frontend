import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoListService } from './video-list.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedApiRequest } from '../models/paginated-api-request';
import { RetrieveVideosResponse } from '../models/retrieve-videos-response';
import { SessionManagementService } from '../session-management.service';
import { Match } from '../models/match';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CancelConfirmModalComponent } from '../cancel-confirm-modal/cancel-confirm-modal.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  providers: [VideoListService]
})
export class VideoListComponent implements OnInit {

  showSpinner = false;
  videos: Array<Video> = [];

  // form toggle controls
  showAddMatch: Array<boolean> = [];
  showAddVideo = false;

  // paginator configuration
  resultsLength = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];

  // request object for the API
  retrieveVideosRequest: PaginatedApiRequest = {
    page: 0,
    pageSize: this.pageSize
  };

  constructor(
    public sessionManagementService: SessionManagementService,
    private videoListService: VideoListService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.retrieveVideos();
  }

  retrieveVideos(): void {
    this.showSpinner = true;
    this.videoListService.retrieveVideos(this.retrieveVideosRequest).subscribe((response: RetrieveVideosResponse) => {
      this.videos = response.videos;
      this.resultsLength = response.totalResults;
      for (const video of this.videos) {
        this.showAddMatch[video.videoId] = false;
        video.matches.sort(this.sortMatches);
      }
      this.showSpinner = false;
    }, (error: HttpErrorResponse) => {
      this.showSpinner = false;
      console.error('Error retrieving video list: ', error.message);
    });
  }

  pageChanged($event: PageEvent): void {
    this.retrieveVideosRequest.page = $event.pageIndex;
    this.retrieveVideosRequest.pageSize = $event.pageSize;
    this.retrieveVideos();
  }

  toggleAddMatch(i: number): void {
    if (this.sessionManagementService.isLoggedIn()) {
      this.showAddMatch[i] = !this.showAddMatch[i];
    } else {
      this.presentLoginDialog();
    }
  }

  toggleAddVideo(): void {
    if (this.sessionManagementService.isLoggedIn()) {
      this.showAddVideo = !this.showAddVideo;
    } else {
      this.presentLoginDialog();
    }
  }

  presentLoginDialog(): void {
    const dialogRef = this.dialog.open(CancelConfirmModalComponent, {
      width: '250px',
      data: {
        title: 'Login required',
        description: 'You must sign in with Twitter to add a video.',
        cancelText: 'Cancel',
        confirmText: 'Login'
      }
    });
    dialogRef.afterClosed().subscribe((didLogin: boolean) => {
      if (didLogin) {
        this.navigateToLogin();
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login'], { state: { callbackUri: '/videos' } });
  }

  updateMatchList(event: Video): void {
    const index = this.videos.indexOf(this.videos.find((video: Video) => video.videoId === event.videoId));
    this.videos[index] = event;
    this.videos[index].matches.sort(this.sortMatches);
  }

  updateVideoList(event: Video): void {
    this.showAddVideo = false;
    this.retrieveVideosRequest.page = 0;
    this.retrieveVideos();
  }

  sortVideos(a: Video, b: Video): number {
    return b.videoId - a.videoId;
  }

  sortMatches(a: Match, b: Match): number {
    const aTime = a.youtubeTimestamp;
    const bTime = b.youtubeTimestamp;
    if (aTime < bTime) {
      return -1;
    } else if (aTime === bTime) {
      return 0;
    } else {
      return 1;
    }
  }

  searchPlayer(player: string): void {
    this.router.navigate(['/search', { p1: player }]);
  }

}
