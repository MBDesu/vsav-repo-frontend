import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RetrieveVideosResponse } from '../models/retrieve-videos-response';
import { PaginatedApiRequest } from '../models/paginated-api-request';

@Injectable({
  providedIn: 'root'
})
export class VideoListService {

  constructor(private http: HttpClient) {}

  retrieveVideos(request: PaginatedApiRequest): Observable<RetrieveVideosResponse> {
    return this.http.post<RetrieveVideosResponse>(environment.RetrieveVideos, request);
  }

}
