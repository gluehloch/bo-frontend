import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { USERROLE } from '../user-role.enum';
import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class SeasonService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findSeasons(): Observable<Array<Rest.SeasonJson>> {
        return this.http.get<Array<Rest.SeasonJson>>(this.rootUrl + 'season/list');
    }

    findGroups(seasonId: number): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.rootUrl + 'season/' + seasonId + '/group/all');
    }

    findCurrent(seasonId: number): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'season/' + seasonId + "/current");
    }

    findRounds(seasonId: number, groupId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all');
    }

    findRound(roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/roundtable/' + roundId + "/group/" + groupId);
    }

    nextRound(roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/roundtable/' + roundId + "/next");
    }

    prevRound(roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/roundtable/' + roundId + "/prev");
    }

    /* Is not in usage anymore.
    update(roundId: number) : Observable<Rest.RoundAndTableJson> {
      return this.http.post<Rest.RoundAndTableJson>(this.rootUrl + 'season/round/' + roundId + "/update", {headers: this.createHeader()});
    }
  
    createOrUpdate( roundId: number) :  Observable<Rest.RoundAndTableJson> {
      return this.http.post<Rest.RoundAndTableJson>(this.rootUrl + 'season/round/' + roundId + "/create", {headers: this.createHeader()});
    }
    */

}
