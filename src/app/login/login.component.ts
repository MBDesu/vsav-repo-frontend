import { Component, OnInit } from '@angular/core';
import { SessionManagementService } from '../session-management.service';
import { TwitterRequestToken } from '../models/twitter-request-token';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private sessionManagementService: SessionManagementService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        localStorage.setItem('callback-uri', JSON.stringify(this.router.getCurrentNavigation().extras.state.callbackUri));
      }
    });
  }

  ngOnInit(): void {
    this.getToken();
  }

  getToken(): void {
    this.sessionManagementService.getToken().subscribe((data: TwitterRequestToken) => {
      sessionStorage.setItem('requestToken', JSON.stringify(data));
      window.location.href = data.authorizationURL;
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

}
