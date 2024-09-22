import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { BetofficeService } from "src/app/betoffice.service";
import { SessionService } from "src/app/session/session.service";

@Injectable()
export class CommunityUpdateService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findCommunity(communityId: number): Observable<Rest.CommunityJson> {
        return this.http.get<Rest.CommunityJson>(this.communityAdminUrl + 'community/' + communityId);
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
