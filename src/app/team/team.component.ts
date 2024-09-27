import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamService } from './team.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { TeamFilter } from './teamFilter.pipe';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

type dfbFilterType = 'DFB' | 'FIFA' | 'alle';
@Component({
    selector: 'teams',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, TeamFilter]
})
export class TeamComponent implements OnInit {

    // Team Types: DFB, FIFA
    teamsModel: Array<Rest.TeamJson>;
    dfbFilterValue: dfbFilterType;
    teamNameFilter: string = '';

    constructor(
        private router: Router,
        private teamService: TeamService,
        private navigationRouterService: NavigationRouterService) {
        this.teamsModel = [];
        this.dfbFilterValue = 'alle';
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

    changeDfbFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if (value === 'DFB' || value === 'FIFA' || value === 'alle') {
            this.dfbFilterValue = value;
        }
    }

    changeTeamNameFilter(x: string) {
        console.log('changeTeamNameFilter', x, this.teamNameFilter);
    }

}
