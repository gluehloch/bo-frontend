import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class CommunityAdminService extends BetofficeService {

    constructor(http: HttpClient) {
        super(http);
    }

    /*
    findCommunities() : Observable<Rest.Page<Rest.CommunityJson>> {
        return this.http.get<Array<Rest.Page>>(this.adminUrl + 'season/list',  {headers: this.createHeader()});
    */

    findCommunities() : Observable<Array<Rest.CommunityJson>> {
        return this.http.get<Array<Rest.CommunityJson>>(this.communityAdminUrl + 'communities',  {headers: this.createHeader()});
    }

}
