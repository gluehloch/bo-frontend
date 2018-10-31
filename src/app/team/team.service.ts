import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class TeamService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  findTeams() : Observable<Array<Rest.TeamJson>> {
    return this.http.get<Array<Rest.TeamJson>>(this.adminUrl + 'team/list', {headers: this.createHeader()});
  }

  updateTeam(team: Rest.TeamJson) : Observable<Rest.TeamJson> {
    return this.http.post<Rest.TeamJson>(this.adminUrl + 'team/update', team, {headers: this.createHeader()});
  }

  addTeam(team: Rest.TeamJson) : Observable<Rest.TeamJson> {
    return this.http.post<Rest.TeamJson>(this.adminUrl + 'team/add', team, {headers: this.createHeader()});
  }

}
