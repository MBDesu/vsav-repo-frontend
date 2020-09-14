import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RetrieveMatchesResponse } from '../models/retrieve-matches-response';
import { RetrieveMatchesRequest } from '../models/retrieve-matches-request';

@Injectable({
  providedIn: 'root'
})
export class MatchListService {

  constructor(private http: HttpClient) {}

  retrieveMatches(request: RetrieveMatchesRequest): Observable<RetrieveMatchesResponse> {
    return this.http.post<RetrieveMatchesResponse>(environment.RetrieveMatches, request);
  }

}
