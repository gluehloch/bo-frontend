import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class CommunityAdminService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    /*
    findCommunities() : Observable<Rest.Page<Rest.CommunityJson>> {
        return this.http.get<Array<Rest.Page>>(this.adminUrl + 'season/list',  {headers: this.createHeader()});
    */

    findCommunities(pageParam: Rest.PageParam): Observable<Rest.Page<Rest.CommunityJson>> {
        const params = new HttpParams({fromString: JSON.stringify(pageParam)});

        return this.http.get<Rest.Page<Rest.CommunityJson>>(
            this.communityAdminUrl + 'communities/', {params: params, headers: this.createHeader()});
    }

}
