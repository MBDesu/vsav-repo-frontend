import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from 'src/app/models/video';

@Injectable({
  providedIn: 'root'
})
export class AddVideoService {

  constructor(private http: HttpClient) {}

  addVideo(video: Video): Observable<Video> {
    const match = video.matches[0];
    return this.http.post<Video>(environment.AddVideo, {
      youtubeId: video.youtubeId,
      playerOneName: match.playerOneName,
      playerOneChar: match.playerOneChar,
      playerTwoName: match.playerTwoName,
      playerTwoChar: match.playerTwoChar,
      youtubeTimestamp: match.youtubeTimestamp
    });
  }

}
