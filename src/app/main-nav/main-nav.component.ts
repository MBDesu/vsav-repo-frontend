import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../theme.service';
import { SessionManagementService } from '../session-management.service';
import { MatDialog } from '@angular/material/dialog';
import { SIGN_OUT_BUTTON_MODAL_OPTIONS, SIGN_IN_BUTTON_MODAL_OPTIONS } from '../models/constants';
import { CancelConfirmModalComponent } from '../cancel-confirm-modal/cancel-confirm-modal.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer: MatSidenav;
  isLightTheme: Observable<boolean>;
  currentRoute: string;

  isSmall$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    public sessionManagementService: SessionManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLightTheme = this.themeService.isLightTheme;
  }

  ngAfterViewInit(): void {
    const prefersLightTheme = JSON.parse(localStorage.getItem('light-theme'));
    this.toggleLightTheme(prefersLightTheme);
  }

  toggleLightTheme(checked: boolean): void {
    setTimeout(() => {
      this.themeService.setLightTheme(checked);
    }, 0);
  }

  logInOrOut(): void {
    const isLoggedIn = this.sessionManagementService.isLoggedIn();
    const dialogRef = this.dialog.open(CancelConfirmModalComponent,
      isLoggedIn ? SIGN_OUT_BUTTON_MODAL_OPTIONS : SIGN_IN_BUTTON_MODAL_OPTIONS);
    dialogRef.afterClosed().subscribe((didConfirm) => {
      if (didConfirm) {
        if (isLoggedIn) {
          this.sessionManagementService.logOut(this.route);
        } else {
          this.router.navigate(['/login'], { state: { callbackUri: this.router.url } });
        }
      }
    });
  }

}
