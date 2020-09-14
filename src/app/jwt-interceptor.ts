import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionManagementService } from './session-management.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private sessionManagementService: SessionManagementService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.sessionManagementService.jwt;
    if (jwt &&
      !(req.url.endsWith(environment.GetToken)
    || req.url.endsWith(environment.RetrieveMatches)
    || req.url.endsWith(environment.RetrieveVideos))) {
      req = req.clone({
        setHeaders: {
          Authorization: `${jwt}`
        }
      });
    }
    return next.handle(req);
  }

}
