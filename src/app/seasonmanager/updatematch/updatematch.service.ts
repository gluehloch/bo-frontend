import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class UpdateMatchService extends BetofficeService {

    constructor(http: HttpClient) {
        super(http);
    }

    findMatch(matchId: number): Observable<Rest.GameJson> {
        return this.http.get<Rest.GameJson>(
            this.rootUrl + 'game/' + matchId, {headers: this.createHeader()});
    }

    updateMatch(match: Rest.GameJson): Observable<Rest.GameJson> {
        return this.http.post<Rest.GameJson>(
            this.adminUrl + 'game/update', match, { headers: this.createHeader()});
    }

}
