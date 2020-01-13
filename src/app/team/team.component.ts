import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamService } from './team.service';
import { NavigationRouterService } from '../navigationrouter.service';

@Component({
    selector: 'teams',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

    // Team Types: DFB, FIFA
    teamsModel: Array<Rest.TeamJson>;
    dfbFilter: string;

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
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_ADMIN_MENU);
        });
    }

    updateTeam(team: Rest.TeamJson) {
        this.router.navigate(['./chiefop/team/update', team.id]);
    }

    addTeam(team: Rest.TeamJson) {
        this.teamService.addTeam(team).subscribe((updatedTeam: Rest.TeamJson) => {
            this.teamsModel.push(updatedTeam);
            this.sortTeams();
        });
    }

    changeDfbFilter(value: boolean) {
        if (!this.dfbFilter) {
            this.dfbFilter = 'DFB';
        } else {
            this.dfbFilter = '';
        }
    }

}
