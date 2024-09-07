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

    findSeasons(): Observable<Array<Rest.SeasonJson>> {
        return this.http.get<Array<Rest.SeasonJson>>(this.rootUrl + 'season');
    }

    findGroups(seasonId: number): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.rootUrl + 'season/' + seasonId + '/group');
    }

    findCurrent(seasonId: number): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'season/' + seasonId + '/current');
    }

    findRounds(seasonId: number, groupId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all');
    }

    findRound(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.seasonService.findRound(seasonId, roundId, groupId);
    }

    nextRound(seasonId: number, roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.seasonService.nextRound(seasonId, roundId);
    }

    prevRound(seasonId: number, roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.seasonService.prevRound(seasonId, roundId);
    }

    updateByOpenligaDb(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/' + seasonId + '/round/' + roundId + '/group/' + groupId + '/ligadbupdate', null);
    }

    createOrUpdateByOpenligaDb(seasonId: number, roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/' + seasonId + '/round/' + roundId + '/group/' + groupId + '/ligadbcreate', null);
    }

    updateMatchday(seasonId: number, round: Rest.RoundJson, group: Rest.GroupTypeJson): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/' + seasonId + '/round/' + round.id + '/group/' + group.id + '/update', round);
    }
}
