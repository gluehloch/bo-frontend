import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class PartyUpdateService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findParty(partyId: number): Observable<Rest.PartyJson> {
        return this.http.get<Rest.PartyJson>(this.adminUrl + 'user/' + partyId);
    }

    updateParty(party: Rest.PartyJson): Observable<Rest.PartyJson> {
        return this.http.post<Rest.PartyJson>(this.adminUrl + 'user/update', party);
    }

}
