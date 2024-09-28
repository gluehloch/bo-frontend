import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class ResearchService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findTeams(): Observable<Array<Rest.TeamJson>> {
        return this.http.get<Array<Rest.TeamJson>>(this.adminUrl + 'team');
    }

    findTeamsByFilter(filter: string, teamType: Rest.TeamType | undefined): Observable<Array<Rest.TeamJson>> {
        let params = {};
        if (teamType !== undefined) {
            params = {filter: filter, type: teamType.toString()};
        } else {
            params = {filter: filter};
        };
        return this.http.get<Array<Rest.TeamJson>>(this.adminUrl + 'team-search', {params: params});
    }

}
