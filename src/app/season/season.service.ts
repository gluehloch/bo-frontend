import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

import { USERROLE } from '../user-role.enum';
import { BetofficeService } from '../betoffice.service';

@Injectable()
export class SeasonService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  findSeasons() : Observable<Array<Rest.SeasonJson>> {
    let response = this.http.get(this.rootUrl + 'season/all', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.SeasonJson>)
                   .catch(this.handleError);
  }

  findGroups(seasonId: number) : Observable<Array<Rest.GroupTypeJson>> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + '/group/all', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.GroupTypeJson>)
                   .catch(this.handleError);
  }

  findCurrent(seasonId: number) : Observable<Rest.RoundJson> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + "/current", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.RoundJson>)
                   .catch(this.handleError);
  }

  findRounds(seasonId: number, groupId: number) : Observable<Rest.SeasonJson> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.SeasonJson)
                   .catch(this.handleError);
  }
  
  findRound(roundId: number, groupId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/group/" + groupId, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

  nextRound(roundId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/next", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }
  
  prevRound(roundId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/prev", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }
   
  update(roundId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.post(this.rootUrl + 'season/round/' + roundId + "/update", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

  createOrUpdate( roundId: number) :  Observable<Rest.RoundAndTableJson> {
    let response = this.http.post(this.rootUrl + 'season/round/' + roundId + "/create", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

}
