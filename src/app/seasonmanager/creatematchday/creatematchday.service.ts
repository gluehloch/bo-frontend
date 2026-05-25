import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class CreateMatchdayService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findSeasons(): Observable<Rest.SeasonJson[]> {
        return this.http.get<Rest.SeasonJson[]>(this.adminUrl + 'season');
    }

    findSeason(seasonId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.adminUrl + 'season/' + seasonId);
    }

    findGroupsBySeason(seasonId: number): Observable<Rest.GroupTypeJson[]> {
        return this.http.get<Rest.GroupTypeJson[]>(this.rootUrl + 'season/' + seasonId + '/group');
    }

    findSeasonGroupTeams(seasonId: number): Observable<Rest.SeasonGroupTeamJson> {
        return this.http.get<Rest.SeasonGroupTeamJson>(this.adminUrl + 'season/' + seasonId + '/groupteam');
    }

    createMatchday(seasonId: number, groupId: number, roundPayload: unknown): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/' + seasonId + '/group/' + groupId + '/round',
            roundPayload
        );
    }
}
