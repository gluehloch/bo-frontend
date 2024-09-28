import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRouterService } from '../navigationrouter.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResearchService } from './research.service';

import * as moment from 'moment';

type dfbFilterType = 'DFB' | 'FIFA' | 'alle';
@Component({
    selector: 'research',
    templateUrl: './research.component.html',
    styleUrls: ['./research.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule]
})
export class ResearchComponent implements OnInit {

    private searchHomeSubject = new Subject<string>();
    private searchGuestSubject = new Subject<string>();

    homeTeamNameFilter = '';
    guestTeamNameFilter = '';

    selectedGuestTeam: Rest.TeamJson | undefined;
    selectedHomeTeam: Rest.TeamJson | undefined;

    homeTeams: Array<Rest.TeamJson> = [];
    guestTeams: Array<Rest.TeamJson> = [];
    
    games: Rest.HistoryTeamVsTeamJson | undefined;
    dates: string[] = [];

    constructor(
        private router: Router,
        private researchService: ResearchService,
        private navigationRouterService: NavigationRouterService) {
    }

    ngOnInit() {
        this.searchHomeSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
            this.researchService.findTeamsByFilter(searchValue, undefined).subscribe((teams: Array<Rest.TeamJson>) => {
                this.homeTeams = teams;
            });
          });

        this.searchGuestSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
            this.researchService.findTeamsByFilter(searchValue, undefined).subscribe((teams: Array<Rest.TeamJson>) => {
                this.guestTeams = teams;
            });
        });

        this.researchService.findTeams().subscribe((teams: Array<Rest.TeamJson>) => {
            this.homeTeams = teams;
            this.guestTeams = teams;
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_RESEARCH);
        });
    }

    ngOnDestroy() {
        this.searchHomeSubject.complete();
        this.searchGuestSubject.complete();
    }

    changeHomeTeamNameFilter() {
        this.searchHomeSubject.next(this.homeTeamNameFilter);
    }

    changeGuestTeamNameFilter() {
        this.searchGuestSubject.next(this.guestTeamNameFilter);
    }

    selectHomeTeam(event: Event) {
        this.queryGames();
    }

    selectGuestTeam(event: Event) {
        this.queryGames();
    }

    private queryGames(): void {
        if (this.selectedHomeTeam && this.selectedGuestTeam) {
            this.researchService.findGames(this.selectedHomeTeam.id, this.selectedGuestTeam.id).subscribe(
                (history: Rest.HistoryTeamVsTeamJson) => {
                    this.games = history;
                    this.dates = this.games.games.map((game) => moment(game.matchDate).format('DD.MM.YYYY HH:mm'));
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    console.log('complete');
                }
            );
        }
    }
}
