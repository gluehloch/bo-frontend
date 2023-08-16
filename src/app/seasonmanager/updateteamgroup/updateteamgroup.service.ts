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

    findGroupTypes(): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.adminUrl + 'groupType');
    }

    findGroupTypesBySeason(seasonId: number): Observable<Array<Rest.GroupTypeJson>> {
        return this.http.get<Array<Rest.GroupTypeJson>>(this.rootUrl + 'season/' + seasonId + '/group');
    }

    findGroupAndTeamsBySeason(seasonId: number): Observable<Rest.SeasonGroupTeamJson> {
        return this.http.get<Rest.SeasonGroupTeamJson>(this.adminUrl + 'season/' + seasonId + '/groupteams');
    }

    addGroupToSeason(seasonId: number, groupType: Rest.GroupTypeJson): Observable<Rest.SeasonJson> {
        return this.http.post<Rest.SeasonJson>(this.adminUrl + 'season/' + seasonId + '/group', groupType);
    }

    remnoveGroupFromSeason(seasonId: number, groupType: Rest.GroupTypeJson): Observable<Rest.SeasonJson> {
        return this.http.delete<Rest.SeasonJson>(this.adminUrl + 'season/' + seasonId + '/group/' + groupType.id);
    }

}
