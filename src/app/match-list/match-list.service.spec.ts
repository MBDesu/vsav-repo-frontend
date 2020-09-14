import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchListService } from './match-list.service';
import { DataMockupUtil } from '../../testing/data-mockups';
import { RetrieveMatchesRequest } from '../models/retrieve-matches-request';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('MatchListService', () => {
  let service: MatchListService;
  let httpMock: HttpTestingController;
  const dummyMatches = DataMockupUtil.generateMockRetrieveMatchesResponse(10, 'p1', 'p2');
  const dummyRequest: RetrieveMatchesRequest = {
    page: 0,
    pageSize: 10,
    playerOneName: 'p1',
    playerTwoName: 'p2'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatchListService]
    });
    service = TestBed.inject(MatchListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('#retrieveMatches', () => {
    it('should return an Observable<RetrieveMatchesResponse>', () => {
      service.retrieveMatches(dummyRequest).subscribe((response) => {
        expect(response.matches.length).toBe(10);
        expect(response.totalResults).toBe(10);
      });
      const httpRequest = httpMock.expectOne(environment.RetrieveMatches);
      expect(httpRequest.request.method).toBe('POST');
      httpRequest.flush(dummyMatches);
    });

    it('should fail with 400', () => {
      service.retrieveMatches(dummyRequest).subscribe((response) => {
        expect(response).toBeFalsy();
      }, (error: HttpErrorResponse) => {
        expect(error.error.message).toBe('bad request');
        expect(error.error.error).toBe(400);
      });
      const httpRequest = httpMock.expectOne(environment.RetrieveMatches);
      const errorEvent = new ErrorEvent('400', { error: 400, message: 'bad request' });
      expect(httpRequest.request.method).toBe('POST');
      httpRequest.error(errorEvent);
    });
  });

});
