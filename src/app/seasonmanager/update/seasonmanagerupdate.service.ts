import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class SeasonManagerUpdateService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  findSeason(seasonId: number): Observable<Rest.SeasonJson> {
    const response = this.http.get(this.adminUrl + 'season/' + seasonId, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.SeasonJson>)
                   .catch(this.handleError);
  }

  updateSeason(season: Rest.SeasonJson): Observable<Rest.SeasonJson> {
    const response = this.http.post(this.adminUrl + 'season/update', season, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.SeasonJson)
                   .catch(this.handleError);
  }

  findParties(seasonId: number): Observable<Array<Rest.SeasonMemberJson>> {
    const response = this.http.get(this.adminUrl + 'season/' + seasonId + '/user', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.SeasonMemberJson>)
                   .catch(this.handleError);
  }

  findPotentialParties(seasonId: number): Observable<Array<Rest.SeasonMemberJson>> {
    const response = this.http.get(this.adminUrl + 'season/' + seasonId + '/potentialuser', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.SeasonMemberJson>)
                   .catch(this.handleError);    
  }
 
}
