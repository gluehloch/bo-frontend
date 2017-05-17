import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class TippService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  nextTippRound(seasonId: number, nickName: string) : Observable<Rest.RoundJson> {
    let response = this.http.get(this.rootUrl + 'tipp/' + seasonId + '/' + nickName + '/current', this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundJson)
                   .catch(this.handleError);
  }

  findTipp(roundId: number, nickName: string) : Observable<Rest.RoundJson> {
    let response = this.http.get(this.rootUrl + 'tipp/' + roundId + '/' + nickName, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundJson)
                   .catch(this.handleError);    
  }
   
  nextRound(roundId: number, nickName: string) : Observable<Rest.RoundJson> {
    let response = this.http.get(this.rootUrl + 'tipp/' + roundId + '/' + nickName + "/next", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundJson)
                   .catch(this.handleError);    
  }
  
  prevRound(roundId: number, nickName: string) : Observable<Rest.RoundJson> {
    let response = this.http.get(this.rootUrl + 'tipp/' + roundId + '/' + nickName + "/prev", this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundJson)
                   .catch(this.handleError);    
  }

  tipp(tippRoundJson: Rest.SubmitTippRoundJson) : Observable<Rest.RoundJson> {
    let response = this.http.post(this.rootUrl + 'tipp/submit', tippRoundJson, this.createRequestOptions());
    return response.map((r: Response) => r.json() as Rest.RoundJson)
                   .catch(this.handleError);    
  }

}
