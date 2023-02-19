import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class RankingService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    calculate(seasonId: number): Observable<Rest.UserTableJson> {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/season/' + seasonId);
    }

    calculateRoundOnly(roundId: number): Observable<Rest.UserTableJson> {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/roundonly/' + roundId);
    }

    nextRound(roundId: number) {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/round/'  + roundId + '/next');
    }

    preRound(roundId: number) {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/round/'  + roundId + '/prev');
    }

}
