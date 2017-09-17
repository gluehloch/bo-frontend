import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { USERROLE } from '../../user-role.enum';
import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class UpdateMatchdayService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  findSeasons() : Observable<Array<Rest.SeasonJson>> {
    return this.http.get<Array<Rest.SeasonJson>>(this.rootUrl + 'season/list', {headers: this.createHeader()});
  }

  findGroups(seasonId: number) : Observable<Array<Rest.GroupTypeJson>> {
    return this.http.get<Array<Rest.GroupTypeJson>>(this.rootUrl + 'season/' + seasonId + '/group/all', {headers: this.createHeader()});
  }

  findCurrent(seasonId: number) : Observable<Rest.RoundJson> {
    return this.http.get<Rest.RoundJson>(this.rootUrl + 'season/' + seasonId + "/current", {headers: this.createHeader()});
  }

  findRounds(seasonId: number, groupId: number) : Observable<Rest.SeasonJson> {
    return this.http.get<Rest.SeasonJson>(this.rootUrl + 'season/' + seasonId + '/group/' + groupId + '/round/all', {headers: this.createHeader()});
  }
  
  findRound(roundId: number, groupId: number) : Observable<Rest.RoundAndTableJson> {
    return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/roundtable/' + roundId + "/group/" + groupId, {headers: this.createHeader()});
  }

  nextRound(roundId: number) : Observable<Rest.RoundAndTableJson> {
    return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/roundtable/' + roundId + "/next", {headers: this.createHeader()});
  }
  
  prevRound(roundId: number) : Observable<Rest.RoundAndTableJson> {
    return this.http.get<Rest.RoundAndTableJson>(this.rootUrl + 'season/roundtable/' + roundId + "/prev", {headers: this.createHeader()});
  }
   
/* --- Update und Create fuer OpenligaDB : TODO Ist noch einzubauen ---
  update(roundId: number) : Observable<Rest.RoundAndTableJson> {
    return this.http.post<Rest.RoundAndTableJson>(this.rootUrl + 'season/round/' + roundId + "/update", {headers: this.createHeader()});
  }

  createOrUpdate(roundId: number) : Observable<Rest.RoundAndTableJson> {
    return this.http.post<Rest.RoundAndTableJson>(this.rootUrl + 'season/round/' + roundId + "/create", {headers: this.createHeader()});
  }
*/

  updateMatchday(round: Rest.RoundJson, group: Rest.GroupTypeJson) : Observable<Rest.RoundAndTableJson> {
    // TODO URL Aufrufen....
    return this.http.post<Rest.RoundAndTableJson>(this.adminUrl + 'season/round/' + round.id + '/group/' + group.id + '/update', round, {headers: this.createHeader()});
  }

}
