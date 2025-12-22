import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { NavigationRouterService } from '../navigationrouter.service';

import { TeamService } from './team.service';

type dfbFilterType = 'DFB' | 'FIFA' | 'alle';
@Component({
    selector: 'teams',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css'],
    imports: [FormsModule]
})
export class TeamComponent implements OnInit {

    // Team Types: DFB, FIFA
    teamsModel: Array<Rest.TeamJson> = [];
    dfbFilterValue: dfbFilterType = 'alle';
    private searchSubject = new Subject<string>();
    teamNameFilter: string = '';

    constructor(
        private router: Router,
        private teamService: TeamService,
        private navigationRouterService: NavigationRouterService) {
    }

    private sortTeams() {
        this.teamsModel.sort((a, b) => a.longName.localeCompare(b.longName));
    }

    ngOnInit() {
        this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
            const teamType = this.dfbFilterValue === 'alle'
                ? undefined
                : this.dfbFilterValue === 'DFB' ? 'DFB' : 'FIFA';
            this.teamService.findTeamsByFilter(searchValue, teamType).subscribe((teams: Array<Rest.TeamJson>) => {
                this.teamsModel = teams;
            });
          });

        this.teamService.findTeams().subscribe((teams: Array<Rest.TeamJson>) => {
            this.teamsModel = teams;
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_ADMIN_MENU);
        });
    }

    ngOnDestroy() {
        this.searchSubject.complete();
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
        this.changeTeamNameFilter();
    }

    changeTeamNameFilter() {
        this.searchSubject.next(this.teamNameFilter);
    }

}
