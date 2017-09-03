import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class SeasonManagerService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  findSeasons() : Observable<Array<Rest.SeasonJson>> {
    return this.http.get<Array<Rest.SeasonJson>>(this.adminUrl + 'season/list',  {headers: this.createHeader()});
  }

}
