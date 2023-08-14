import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BetofficeService } from "src/app/betoffice.service";
import { SessionService } from "src/app/session/session.service";

@Injectable()
export class UpdateSeasonGroupTeamService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findSeason(seasonId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.adminUrl + 'season/' + seasonId);
    }

    findTeams(): Observable<Array<Rest.TeamJson>> {
        return this.http.get<Array<Rest.TeamJson>>(this.adminUrl + 'team');
    }

}
