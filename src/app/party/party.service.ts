import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class PartyService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  findParties() : Observable<Array<Rest.PartyJson>> {
    let response = this.http.get(this.adminUrl + 'user/list', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.PartyJson>)
                   .catch(this.handleError);    
  }

  updateParty(party: Rest.PartyJson) : Observable<Rest.PartyJson> {
    let response = this.http.post(this.adminUrl + 'user/update', party, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.PartyJson)
                   .catch(this.handleError);    
  }

  addParty(party: Rest.PartyJson) : Observable<Rest.PartyJson> {
    let response = this.http.post(this.adminUrl + 'user/add', party, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.PartyJson)
                   .catch(this.handleError);    
  }

}
