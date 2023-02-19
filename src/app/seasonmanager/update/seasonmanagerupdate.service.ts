import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class SeasonManagerUpdateService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findSeason(seasonId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.adminUrl + 'season/' + seasonId);
    }

    updateSeason(season: Rest.SeasonJson): Observable<Rest.SeasonJson> {
        return this.http.post<Rest.SeasonJson>(this.adminUrl + 'season/update', season);
    }

    findParties(seasonId: number): Observable<Array<Rest.SeasonMemberJson>> {
        return this.http.get<Array<Rest.SeasonMemberJson>>(this.adminUrl + 'season/' + seasonId + '/user');
    }

    findPotentialParties(seasonId: number): Observable<Array<Rest.SeasonMemberJson>> {
        return this.http.get<Array<Rest.SeasonMemberJson>>(
            this.adminUrl + 'season/' + seasonId + '/potentialuser');
    }

    addUser(seasonId: number, members: Array<Rest.SeasonMemberJson>): Observable<Array<Rest.SeasonMemberJson>> {
        return this.http.post<Array<Rest.SeasonMemberJson>>(
            this.adminUrl + 'season/' + seasonId + '/user/add', members);
    }

    removeUser(seasonId: number, members: Array<Rest.SeasonMemberJson>): Observable<Array<Rest.SeasonMemberJson>> {
        return this.http.post<Array<Rest.SeasonMemberJson>>(
            this.adminUrl + 'season/' + seasonId + '/user/remove', members);
    }

}
