import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class UpdateMatchService extends BetofficeService {

    constructor(http: HttpClient) {
        super(http);
    }

    findMatch(matchId: number): Observable<Rest.GameJson> {
        return this.http.get<Rest.GameJson>(
            this.rootUrl + 'game/' + matchId, {headers: this.createHeader()});
    }

    updateMatch(match: Rest.GameJson): Observable<Rest.GameJson> {
        return this.http.post<Rest.GameJson>(
            this.adminUrl + 'game/update', match, { headers: this.createHeader()});
    }

    findSeason(roundId: number): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(
            this.rootUrl + '/season/round/' + roundId, { headers: this.createHeader()});
    }

/*
    @RequestMapping(value = "/season/round/{roundId}", method = RequestMethod.GET)
    public RoundJson findRound(@PathVariable("roundId") Long roundId) {
        return betofficeBasicJsonService.findRound(roundId);
*/
}
