import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class SeasonManagerUpdateService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  findSeason(seasonId: number) : Observable<Rest.SeasonJson> {
    let response = this.http.get(this.adminUrl + 'season/' + seasonId, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Array<Rest.SeasonJson>)
                   .catch(this.handleError);
  }

  updateSeason(season: Rest.SeasonJson) : Observable<Rest.SeasonJson> {
    /*
    let response = this.http.post(this.adminUrl + 'user/update', party, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.PartyJson)
                   .catch(this.handleError);
    */
    return null;
  }

}
