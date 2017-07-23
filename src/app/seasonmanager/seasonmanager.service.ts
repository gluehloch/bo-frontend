import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class SeasonManagerService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  findSeasons() : Observable<Array<Rest.SeasonJson>> {
    let response = this.http.get(this.adminUrl + 'season/list', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.SeasonJson>)
                   .catch(this.handleError);
  }

}
