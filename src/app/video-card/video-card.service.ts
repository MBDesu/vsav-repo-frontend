import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class VideoCardService {

  constructor(private http: HttpClient) { }

  deleteMatch(matchIdToDelete: number): Observable<void> {
    return this.http.post<void>(environment.DeleteMatch, { matchId: matchIdToDelete });
  }

  updateMatch(match: Match): Observable<void> {
    return this.http.post<void>(environment.UpdateMatch, {
      playerOneName: match.playerOneName,
      playerTwoName: match.playerTwoName,
      playerOneChar: match.playerOneChar,
      playerTwoChar: match.playerTwoChar,
      matchId: match.matchId,
      youtubeTimestamp: match.youtubeTimestamp
    });
  }

}
