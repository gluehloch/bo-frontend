import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class SeasonManagerCreateService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  createSeason(season: Rest.SeasonJson): Observable<Rest.SeasonJson> {
    const response = this.http.post(this.adminUrl + 'season/create', season, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.SeasonJson)
                   .catch(this.handleError);
  }

}
