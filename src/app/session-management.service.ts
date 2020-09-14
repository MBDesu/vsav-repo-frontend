import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TwitterRequestToken } from './models/twitter-request-token';
import { JwtResponse } from './models/jwt-response';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  jwt: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): Observable<TwitterRequestToken> {
    return this.http.get<TwitterRequestToken>(environment.GetToken);
  }

  generateAccessToken(twitterOauthVerifier: string): Observable<JwtResponse> {
    const tokenObject = JSON.parse(sessionStorage.getItem('requestToken'));
    return this.http.post<JwtResponse>(environment.GenerateAccessToken, {
      token: tokenObject.token,
      tokenSecret: tokenObject.tokenSecret,
      oauthVerifier: twitterOauthVerifier
    });
  }

  isLoggedIn(): boolean {
    return this.jwt !== null && this.jwt !== undefined;
  }

  logOut(route: ActivatedRoute): void {
    this.jwt = null;
    this.router.navigate([route.snapshot.url]);
  }

}
