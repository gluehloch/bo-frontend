import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

import { USERROLE } from '../user-role.enum';
import { Authentication } from '../authentication/authentication.component';
import { BetofficeService } from '../betoffice.service';

@Injectable()
export class SeasonService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  findSeasons() : Observable<Array<Rest.SeasonJson>> {
    let response = this.http.get(this.rootUrl + 'season/all', this.options);
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

  findRounds(seasonId: number, groupId: number) : Observable<Rest.SeasonJson> {
    let response = this.http.get(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all');
    return response.map((r: Response) => r.json() as Rest.SeasonJson)
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
      token: authentication.securityToken.token
    });
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

  createOrUpdate( roundId: number, authentication: Authentication) :  Observable<Rest.RoundAndTableJson> {
    let response = this.http.post(this.rootUrl + 'season/round/' + roundId + "/create",
    {
      token: authentication.securityToken.token
    });
    return response.map((r: Response) => r.json() as Rest.RoundAndTableJson)
                   .catch(this.handleError);
  }

}
