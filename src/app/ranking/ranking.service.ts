import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class RankingService {

  private rootUrl = environment.rootUrl;
  private options: RequestOptions;

  constructor(private http: Http) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });
  }

  calculate(seasonId: number) : Observable<Rest.UserTableJson> {
    let response = this.http.get(this.rootUrl + 'ranking/season/' + seasonId);
    return response.map((r: Response) => r.json() as Rest.UserTableJson)
                   .catch(this.handleError);
  }

  nextRound(currentRoundId: number) {
    let response = this.http.get(this.rootUrl + 'ranking/round/'  + currentRoundId + '/next');
    return response.map((r: Response) => r.json() as Rest.UserTableJson)
                   .catch(this.handleError);
  }

  preRound(currentRoundId: number) {
    let response = this.http.get(this.rootUrl + 'ranking/round/'  + currentRoundId + '/prev');
    return response.map((r: Response) => r.json() as Rest.UserTableJson)
                   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // TODO Error handling
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
