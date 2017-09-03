import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class PartyService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  findParties() : Observable<Array<Rest.PartyJson>> {
    return this.http.get<Array<Rest.PartyJson>>(this.adminUrl + 'user/list', {headers: this.createHeader()});
  }

  updateParty(party: Rest.PartyJson) : Observable<Rest.PartyJson> {
    return this.http.post<Rest.PartyJson>(this.adminUrl + 'user/update', party, {headers: this.createHeader()});
  }

  addParty(party: Rest.PartyJson) : Observable<Rest.PartyJson> {
    return this.http.post<Rest.PartyJson>(this.adminUrl + 'user/add', party, {headers: this.createHeader()});
  }

}
