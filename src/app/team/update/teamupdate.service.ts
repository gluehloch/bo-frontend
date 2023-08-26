import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class TeamUpdateService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findTeam(teamId: number): Observable<Rest.TeamJson> {
        return this.http.get<Rest.TeamJson>(this.adminUrl + 'team/' + teamId);
    }

    updateTeam(team: Rest.TeamJson): Observable<Rest.TeamJson> {
        return this.http.put<Rest.TeamJson>(this.adminUrl + 'team', team);
    }

}
