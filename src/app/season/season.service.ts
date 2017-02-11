import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

import { USERROLE } from '../user-role.enum';
import { Authentication } from '../authentication/authentication.service';

@Injectable()
export class SeasonService {

  private rootUrl = environment.rootUrl;
  private options: RequestOptions;

  constructor(private http: Http) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });
  }

  findSeasons() : Observable<Array<Rest.SeasonJson>> {
    let response = this.http.post(this.rootUrl + 'season/all', this.options);
    return response.map((r: Response) => r.json() as Array<Rest.SeasonJson>)
                   .catch(this.handleError);
  }

  findGroups(seasonId: number) : Observable<Array<Rest.GroupTypeJson>> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + '/group/all');
    return response.map((r: Response) => r.json() as Array<Rest.GroupTypeJson>)
                   .catch(this.handleError);
  }

  findCurrent(seasonId: number) : Observable<Rest.RoundJson> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + "/current");
    return response.map((r: Response) => r.json() as Array<Rest.RoundJson>)
                   .catch(this.handleError);
  }

  findRounds(seasonId: number, groupId: number) : Observable<Array<Rest.RoundJson>> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all');
    return response.map((r: Response) => r.json() as Array<Rest.RoundJson>)
                   .catch(this.handleError);
  }
  
  findRound(roundId: number, groupId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/group/" + groupId);
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

  nextRound(roundId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/next");
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }
  
  prevRound(roundId: number) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/prev");
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }
   
  update(roundId: number, authentication: Authentication) : Observable<Rest.RoundAndTableJson> {
    let response = this.http.post(this.rootUrl + 'season/round/' + roundId + "/update",
    {
      token: authentication.token
    });
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

  createOrUpdate( roundId: number, authentication: Authentication) :  Observable<Rest.RoundAndTableJson> {
    let response = this.http.post(this.rootUrl + 'season/round/' + roundId + "/create",
    {
      token: authentication.token
    });
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // TODO Error handling
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
