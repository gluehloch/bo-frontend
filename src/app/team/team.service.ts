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
        return this.http.get<Array<Rest.TeamJson>>(this.adminUrl + 'team/list', { headers: this.createHeader() });
    }

    updateTeam(team: Rest.TeamJson): Observable<Rest.TeamJson> {
        return this.http.post<Rest.TeamJson>(this.adminUrl + 'team/update', team, { headers: this.createHeader() });
    }

    addTeam(team: Rest.TeamJson): Observable<Rest.TeamJson> {
        return this.http.post<Rest.TeamJson>(this.adminUrl + 'team/add', team, { headers: this.createHeader() });
    }

}
