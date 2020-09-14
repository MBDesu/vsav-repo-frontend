import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { Routes, RouterModule } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { VideoListComponent } from './video-list/video-list.component';
import { SharedService } from './shared.service';
import { SessionManagementService } from './session-management.service';
import { JwtInterceptor } from './jwt-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewlinesPipe } from './pipes/newlines.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMatchFormComponent } from './forms/add-match-form/add-match-form.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AddVideoFormComponent } from './forms/add-video-form/add-video-form.component';
import { TwitterSignInComponent } from './twitter-sign-in/twitter-sign-in.component';
import { MatchListCardComponent } from './match-list-card/match-list-card.component';
import { SearchMatchesFormComponent } from './forms/search-matches-form/search-matches-form.component';
import { ThemeService } from './theme.service';
import { LoginComponent } from './login/login.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CancelConfirmModalComponent } from './cancel-confirm-modal/cancel-confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VideoCardComponent } from './video-card/video-card.component';
import { EditMatchFormComponent } from './forms/edit-match-form/edit-match-form.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const appRoutes: Routes = [
  { path: '', component: VideoListComponent },
  { path: 'search', component: MatchListComponent },
  { path: 'videos', component: VideoListComponent },
  { path: 'twitter-sign-in', component: TwitterSignInComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditVideoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    VideoListComponent,
    MatchListComponent,
    NewlinesPipe,
    AddMatchFormComponent,
    AddVideoFormComponent,
    TwitterSignInComponent,
    SafeUrlPipe,
    MatchListCardComponent,
    SearchMatchesFormComponent,
    LoginComponent,
    ScrollToTopComponent,
    CancelConfirmModalComponent,
    VideoCardComponent,
    EditMatchFormComponent,
    EditVideoComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollableModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  entryComponents: [
    CancelConfirmModalComponent
  ],
  providers: [
    SharedService,
    SessionManagementService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ThemeService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
