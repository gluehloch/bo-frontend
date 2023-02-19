import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class HomeService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    calculate(seasonId: number): Observable<Rest.UserTableJson> {
        return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/season/' + seasonId);
    }

}
