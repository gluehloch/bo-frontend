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

    findDfbTeams(): Observable<Array<Rest.TeamJson>> {
        return this.http.get<Array<Rest.TeamJson>>(this.rootUrl  + 'research/team/dfb');
    }

    findFifaTeams(): Observable<Array<Rest.TeamJson>> {
        return this.http.get<Array<Rest.TeamJson>>(this.rootUrl  + 'research/team/fifa');
    }

    findTeamsByFilter(filter: string, teamType: Rest.TeamType | undefined): Observable<Array<Rest.TeamJson>> {
        let params = {};
        if (teamType !== undefined) {
            params = {filter: filter, type: teamType.toString()};
        } else {
            params = {filter: filter};
        };
        return this.http.get<Array<Rest.TeamJson>>(this.rootUrl + 'research/team-search', {params: params});
    }

    findGamesTeamVsTeam(homeTeamId: number, guestTeamId: number, spin: boolean): Observable<Rest.HistoryTeamVsTeamJson> {
        const params = { homeTeam: homeTeamId, guestTeam: guestTeamId, spin: spin };
        return this.http.get<Rest.HistoryTeamVsTeamJson>(this.rootUrl  + 'research/game/team-vs-team', { params: params });
    }

    findGamesWithHomeTeam(teamId: number): Observable<Rest.HistoryTeamVsTeamJson> {
        const params = { team: teamId };
        return this.http.get<Rest.HistoryTeamVsTeamJson>(this.rootUrl  + 'research/game/home-team', { params: params });
    }

    findGamesWithGuestTeam(teamId: number): Observable<Rest.HistoryTeamVsTeamJson> {
        const params = { team: teamId };
        return this.http.get<Rest.HistoryTeamVsTeamJson>(this.rootUrl  + 'research/game/guest-team', { params: params });
    }

    findGamesWithTeam(teamId: number): Observable<Rest.HistoryTeamVsTeamJson> {
        const params = { team: teamId };
        return this.http.get<Rest.HistoryTeamVsTeamJson>(this.rootUrl  + 'research/game/team', { params: params });
    }

}
