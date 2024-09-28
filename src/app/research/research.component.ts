import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRouterService } from '../navigationrouter.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResearchService } from './research.service';

type dfbFilterType = 'DFB' | 'FIFA' | 'alle';
@Component({
    selector: 'research',
    templateUrl: './research.component.html',
    styleUrls: ['./research.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor]
})
export class ResearchComponent implements OnInit {

    homeTeamNameFilter = '';
    guestTeamNameFilter = '';

    // Team Types: DFB, FIFA
    teamsModel: Array<Rest.TeamJson>;
    dfbFilterValue: dfbFilterType;
    private searchSubject = new Subject<string>();
    teamNameFilter: string = '';

    constructor(
        private router: Router,
        private teamService: ResearchService,
        private navigationRouterService: NavigationRouterService) {
        this.teamsModel = [];
        this.dfbFilterValue = 'alle';
    }

    private sortTeams() {
        this.teamsModel.sort((a, b) => a.longName.localeCompare(b.longName));
    }

    ngOnInit() {
        this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
            console.log('changeTeamNameFilter', this.teamNameFilter);
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

    changeHomeTeamNameFilter() {

    }

    changeGuestTeamNameFilter() {

    }

}
