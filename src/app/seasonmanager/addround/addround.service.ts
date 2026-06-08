import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class AddRoundService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
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
