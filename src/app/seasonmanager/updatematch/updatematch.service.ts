import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class UpdateMatchService extends BetofficeService {

    constructor(http: HttpClient) {
        super(http);
    }

    nextRound(roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(
            this.rootUrl + 'season/roundtable/' + roundId + '/next', {headers: this.createHeader()});
    }

    prevRound(roundId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.get<Rest.RoundAndTableJson>(
            this.rootUrl + 'season/roundtable/' + roundId + '/prev', {headers: this.createHeader()});
    }

    updateByOpenligaDb(roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/round/' + roundId + '/group/' + groupId + '/ligadbupdate', null, {headers: this.createHeader()});
    }

    createOrUpdateByOpenligaDb(roundId: number, groupId: number): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/round/' + roundId + '/group/' + groupId + '/ligadbcreate', null, {headers: this.createHeader()});
    }

    updateMatchday(round: Rest.RoundJson, group: Rest.GroupTypeJson): Observable<Rest.RoundAndTableJson> {
        return this.http.post<Rest.RoundAndTableJson>(
            this.adminUrl + 'season/round/' + round.id + '/group/' + group.id + '/update', round, {headers: this.createHeader()});
    }
}
