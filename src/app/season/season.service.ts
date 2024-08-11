import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class SeasonService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findSeasons(): Observable<Array<Rest.SeasonJson>> {
        return this.http.get<Array<Rest.SeasonJson>>(this.rootUrl + 'season');
    }

    findGroups(seasonId: number): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.rootUrl + 'season/' + seasonId + '/group');
    }

    findCurrent(seasonId: number): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'season/' + seasonId + "/current");
    }

    findRounds(seasonId: number, groupId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all');
    }

    findRound(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/' + seasonId + '/roundtable/' + roundId + "/group/" + groupId);
    }

    nextRound(seasonId: number, roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/' + seasonId + '/roundtable/' + roundId + "/next");
    }

    prevRound(seasonId: number, roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/' + seasonId + '/roundtable/' + roundId + "/prev");
    }

}
