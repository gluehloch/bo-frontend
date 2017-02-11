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

  findSeasons() {
    return this.http.post(this.rootUrl + 'season/all', this.options);
  }

  findGroups(seasonId: number) {
    return this.http.get(this.rootUrl + 'season/' + seasonId + '/group/all');
  }

  findCurrent(seasonId: number) {
    return this.http.get(this.rootUrl + 'season/' + seasonId + "/current");
  }

  findRounds(seasonId: number, groupId: number) {
    return this.http.get(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all');
  }
  
  findRound(roundId: number, groupId: number) {
    return this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/group/" + groupId);
  }

  nextRound(roundId: number) {
    return this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/next");
  }
  
  prevRound(roundId: number) {
    return this.http.get(this.rootUrl + 'season/roundtable/' + roundId + "/prev");
  }
   
  update(roundId: number, authentication: Authentication) {
    return this.http.post(this.rootUrl + 'season/round/' + roundId + "/update",
    {
      token: authentication.token
    });
  }

  createOrUpdate( roundId: number, authentication: Authentication) {
    return this.http.post(this.rootUrl + 'season/round/' + roundId + "/create",
    {
      token: authentication.token
    });
  }

  private handleError(error: any): Promise<any> {
    // TODO Error handling
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
