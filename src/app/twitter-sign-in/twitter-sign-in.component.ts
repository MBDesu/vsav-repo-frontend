import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionManagementService } from '../session-management.service';
import { JwtResponse } from '../models/jwt-response';

@Component({
  selector: 'app-twitter-sign-in',
  templateUrl: './twitter-sign-in.component.html',
  styleUrls: ['./twitter-sign-in.component.scss']
})
export class TwitterSignInComponent implements OnInit {

  constructor(
    private sessionManagementService: SessionManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const oauthVerifier = this.route.snapshot.queryParams.oauth_verifier;
    const denied = this.route.snapshot.queryParams.denied;
    if (denied === undefined || denied === null) {
      this.sessionManagementService.generateAccessToken(oauthVerifier).subscribe((data: JwtResponse) => {
        this.sessionManagementService.jwt = data.jwt;
        const uri = JSON.parse(localStorage.getItem('callback-uri'));
        if (uri) {
          this.router.navigate([uri]).then(() => {
            return;
          }, () => {
            this.router.navigate(['/videos']);
          });
        } else {
          this.router.navigate(['/videos']);
        }
      });
    } else {
      this.router.navigate(['/videos']);
    }
  }

}
