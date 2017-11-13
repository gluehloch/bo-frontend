import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { TeamService } from './team.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamComponent implements OnInit {

  teamsModel: Array<Rest.TeamJson>;

  constructor(
      private router: Router,
      private teamService: TeamService,
      private navigationRouterService: NavigationRouterService) {
    this.teamsModel = new Array();
  }

  private sortTeams() {
    this.teamsModel.sort((a, b) => a.longName.localeCompare(b.longName));
  }

  ngOnInit() {
    this.teamService.findTeams().subscribe((teams: Array<Rest.TeamJson>) => {
      this.teamsModel = teams;
    });
    this.navigationRouterService.activate(NavigationRouterService.ROUTE_ADMIN_MENU);
  }

  updateTeam(team: Rest.TeamJson) {
    this.router.navigate(['./chiefop/team/update', team.id]);
  }

  addTeam(team: Rest.TeamJson) {
    this.teamService.addTeam(team).subscribe((team: Rest.TeamJson) => {
      this.teamsModel.push(team);
      this.sortTeams();
    });
  }

}
