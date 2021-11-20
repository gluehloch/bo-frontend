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
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/season/' + seasonId, {headers: this.createHeader()});
    }

    calculateRoundOnly(roundId: number): Observable<Rest.UserTableJson> {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/roundonly/' + roundId, {headers: this.createHeader()});
    }

    nextRound(roundId: number) {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/round/'  + roundId + '/next', {headers: this.createHeader()});
    }

    preRound(roundId: number) {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/round/'  + roundId + '/prev', {headers: this.createHeader()});
    }

}
