import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { BetofficeService } from '../betoffice.service';

@Injectable()
export class HomeService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  calculate(seasonId: number) : Observable<Rest.UserTableJson> {
    return this.http.get<Rest.UserTableJson>(this.rootUrl + 'ranking/season/' + seasonId, {headers: this.createHeader()});
  }

}
