import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class TeamService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findTeams(): Observable<Array<Rest.TeamJson>> {
        return this.http.get<Array<Rest.TeamJson>>(this.adminUrl + 'team');
    }

    updateTeam(team: Rest.TeamJson): Observable<Rest.TeamJson> {
        return this.http.put<Rest.TeamJson>(this.adminUrl + 'team', team);
    }

    addTeam(team: Rest.TeamJson): Observable<Rest.TeamJson> {
        return this.http.post<Rest.TeamJson>(this.adminUrl + 'team', team);
    }

}
