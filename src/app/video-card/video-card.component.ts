import { VideoCardService } from './video-card.service';
import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video';
import { SessionManagementService } from '../session-management.service';
import { Match } from '../models/match';
import { CancelConfirmModalOptions } from '../models/cancel-confirm-modal-options';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CancelConfirmModalComponent } from '../cancel-confirm-modal/cancel-confirm-modal.component';
import { Router } from '@angular/router';
import { ADD_MATCH_MODAL_OPTIONS, DELETE_MATCH_CONFIRM_MODAL_OPTIONS, DELETE_MATCH_LOGIN_MODAL_OPTIONS, EDIT_VIDEO_MODAL_OPTIONS } from '../models/constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  providers: [VideoCardService]
})
export class VideoCardComponent {

  @Input() video: Video;
  showAddMatch = false;
  showEdit = false;

  constructor(
    public sessionManagementService: SessionManagementService,
    private dialog: MatDialog,
    private router: Router,
    private videoCardService: VideoCardService
  ) { }

  toggleAddMatch(): void {
    if (this.sessionManagementService.isLoggedIn()) {
      this.showAddMatch = !this.showAddMatch;
    } else {
      this.presentCancelConfirmModal(ADD_MATCH_MODAL_OPTIONS, (didLogin: boolean) => {
        if (didLogin) {
          this.login();
        }
      });
    }
  }

  deleteMatch(matchId: number): void {
    if (this.sessionManagementService.isLoggedIn()) {
      this.presentCancelConfirmModal(DELETE_MATCH_CONFIRM_MODAL_OPTIONS, (didDelete: boolean) => {
        if (didDelete) {
          this.videoCardService.deleteMatch(matchId).subscribe(() => {
            this.video.matches = this.video.matches.filter((match) => match.matchId !== matchId);
          }, (error: HttpErrorResponse) => {
            console.error(error);
          });
        }
      });
    } else {
      this.presentCancelConfirmModal(DELETE_MATCH_LOGIN_MODAL_OPTIONS, (didLogin) => {
        if (didLogin) {
          this.login();
        }
      });
    }
  }

  updateMatch($event: Match): void {
    const idx = this.video.matches.findIndex((match) => match.matchId === $event.matchId);
    this.video.matches[idx] = $event;
    this.video.matches.sort(this.sortMatches);
    this.videoCardService.updateMatch($event).subscribe((data) => {
      console.log(data);
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

  updateMatchList(event: Video): void {
    this.video = event;
    this.video.matches.sort(this.sortMatches);
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

  login(): void {
    this.router.navigate(['/login'], { state: { callbackUri: this.router.url } });
  }

  presentCancelConfirmModal(cancelConfirmModalOptions: CancelConfirmModalOptions, callbackFn: (didConfirm: boolean) => void): void {
    const dialogRef = this.dialog.open(CancelConfirmModalComponent, cancelConfirmModalOptions);
    dialogRef.afterClosed().subscribe(callbackFn);
  }

  toggleEdit(): void {
    if (this.sessionManagementService.isLoggedIn()) {
      this.showEdit = !this.showEdit;
    } else {
      this.presentCancelConfirmModal(EDIT_VIDEO_MODAL_OPTIONS, (didLogin: boolean) => {
        if (didLogin) {
          this.login();
        }
      });
    }
  }

}
