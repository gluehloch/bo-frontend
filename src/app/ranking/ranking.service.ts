import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { BetofficeService } from '../betoffice.service';

@Injectable()
export class RankingService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  calculate(seasonId: number) : Observable<Rest.UserTableJson> {
    let response = this.http.get(this.rootUrl + 'ranking/season/' + seasonId, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.UserTableJson)
                   .catch(this.handleError);
  }

  nextRound(currentRoundId: number) {
    let response = this.http.get(this.rootUrl + 'ranking/round/'  + currentRoundId + '/next', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.UserTableJson)
                   .catch(this.handleError);
  }

  preRound(currentRoundId: number) {
    let response = this.http.get(this.rootUrl + 'ranking/round/'  + currentRoundId + '/prev', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.UserTableJson)
                   .catch(this.handleError);
  }

}
