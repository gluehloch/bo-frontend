import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class PartyService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findParties(): Observable<Array<Rest.PartyJson>> {
        return this.http.get<Array<Rest.PartyJson>>(this.adminUrl + 'user');
    }

    updateParty(party: Rest.PartyJson): Observable<Rest.PartyJson> {
        return this.http.post<Rest.PartyJson>(this.adminUrl + 'user/update', party);
    }

    addParty(party: Rest.PartyJson): Observable<Rest.PartyJson> {
        return this.http.post<Rest.PartyJson>(this.adminUrl + 'user/add', party);
    }

}
