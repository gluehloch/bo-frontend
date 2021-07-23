import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class SeasonManagerCreateService extends BetofficeService {

    constructor(http: HttpClient) {
        super(http);
    }

    createSeason(season: Rest.SeasonJson): Observable<Rest.SeasonJson> {
        return this.http.post<Rest.SeasonJson>(this.adminUrl + 'season/create', season, { headers: this.createHeader() });
    }

}
