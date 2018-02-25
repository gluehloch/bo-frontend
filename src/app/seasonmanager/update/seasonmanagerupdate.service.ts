import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class SeasonManagerUpdateService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  findSeason(seasonId: number): Observable<Rest.SeasonJson> {
    return this.http.get<Rest.SeasonJson>(this.adminUrl + 'season/' + seasonId, {headers: this.createHeader()});
  }

  updateSeason(season: Rest.SeasonJson): Observable<Rest.SeasonJson> {
    return this.http.post<Rest.SeasonJson>(this.adminUrl + 'season/update', season, {headers: this.createHeader()});
  }

  findParties(seasonId: number): Observable<Array<Rest.SeasonMemberJson>> {
    return this.http.get<Array<Rest.SeasonMemberJson>>(this.adminUrl + 'season/' + seasonId + '/user', {headers: this.createHeader()});
  }

  findPotentialParties(seasonId: number): Observable<Array<Rest.SeasonMemberJson>> {
    return this.http.get<Array<Rest.SeasonMemberJson>>(
      this.adminUrl + 'season/' + seasonId + '/potentialuser', {headers: this.createHeader()});
  }

  addUser(seasonId: number, members: Array<Rest.SeasonMemberJson>): Observable<Array<Rest.SeasonMemberJson>> {
    return this.http.post<Array<Rest.SeasonMemberJson>>(
      this.adminUrl + 'season/' + seasonId + '/user/add', members, {headers: this.createHeader()});
  }

  removeUser(seasonId: number, members: Array<Rest.SeasonMemberJson>): Observable<Array<Rest.SeasonMemberJson>> {
    return this.http.post<Array<Rest.SeasonMemberJson>>(
      this.adminUrl + 'season/' + seasonId + '/user/remove', members, {headers: this.createHeader()});
  }

}
