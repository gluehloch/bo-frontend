import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';
import { SessionService } from 'src/app/session/session.service';

@Injectable()
export class SeasonManagerCreateService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    createSeason(season: Rest.SeasonJson): Observable<Rest.SeasonJson> {
        return this.http.post<Rest.SeasonJson>(this.adminUrl + 'season/create', season, { headers: this.createHeader() });
    }

}
