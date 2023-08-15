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
        return this.http.put<Rest.SeasonJson>(this.adminUrl + 'season', season);
    }

    findGroupTypes(): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.adminUrl + 'groupType');
    }

    findGroupTypesBySeason(seasonId: number): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.rootUrl + 'season/' + seasonId + '/group');
    }

}
