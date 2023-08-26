import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class UpdateMatchService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findMatch(matchId: number): Observable<Rest.GameJson> {
        return this.http.get<Rest.GameJson>(
            this.rootUrl + 'game/' + matchId);
    }

    updateMatch(match: Rest.GameJson): Observable<Rest.GameJson> {
        return this.http.post<Rest.GameJson>(
            this.adminUrl + 'game/update', match);
    }

    findSeason(roundId: number): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(
            this.rootUrl + '/season/round/' + roundId);
    }

/*
    @RequestMapping(value = "/season/round/{roundId}", method = RequestMethod.GET)
    public RoundJson findRound(@PathVariable("roundId") Long roundId) {
        return betofficeBasicJsonService.findRound(roundId);
*/
}
