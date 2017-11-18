import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { BetofficeService } from '../../betoffice.service';

@Injectable()
export class TeamUpdateService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

  findTeam(teamId: number) : Observable<Rest.TeamJson> {
    return this.http.get<Rest.TeamJson>(this.adminUrl + 'team/' + teamId, {headers: this.createHeader()});
  }

  updateTeam(team: Rest.TeamJson) : Observable<Rest.TeamJson> {
    return this.http.post<Rest.TeamJson>(this.adminUrl + 'team/update', team, {headers: this.createHeader()});
  }

}
