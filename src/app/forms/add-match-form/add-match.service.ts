import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from 'src/app/models/match';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddMatchService {

  constructor(private http: HttpClient) {}

  addMatch(targetVideoId: number, match: Match): Observable<object> {
    return this.http.post(environment.AddMatch, {
      videoId: targetVideoId,
      playerOneName: match.playerOneName,
      playerTwoName: match.playerTwoName,
      playerOneChar: match.playerOneChar,
      playerTwoChar: match.playerTwoChar,
      youtubeTimestamp: match.youtubeTimestamp
    });
  }

}
