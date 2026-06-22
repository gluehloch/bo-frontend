import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';
import { SeasonService } from 'src/app/season/season.service';

@Injectable()
export class UpdateMatchdayService extends BetofficeService {

    private seasonService: SeasonService;

    constructor(http: HttpClient, sessionService: SessionService, seasonService: SeasonService) {
        super(http, sessionService);
        this.seasonService = seasonService;
    }

    findCurrent(seasonId: number): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'season/' + seasonId + '/current');
    }

    findRound(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.seasonService.findRound(seasonId, roundId, groupId);
    }

    updateByOpenligaDb(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/' + seasonId + '/round/' + roundId + '/group/' + groupId + '/ligadbupdate', null);
    }

    createOrUpdateByOpenligaDb(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/' + seasonId + '/round/' + roundId + '/group/' + groupId + '/ligadbcreate', null);
    }

}
