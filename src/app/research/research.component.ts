import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRouterService } from '../navigationrouter.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResearchService } from './research.service';

import * as moment from 'moment';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

type dfbFilterType = 'DFB' | 'FIFA';
type ResearchFilterType = 'HOME_AND_GUEST' | 'HOME_OR_GUEST' | 'ONLY_HOME' | 'ONLY_GUEST';
@Component({
    selector: 'research',
    templateUrl: './research.component.html',
    styleUrls: ['./research.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, SpinnerComponent]
})
export class ResearchComponent implements OnInit {

    contentReady = signal(true); // TODO Laden der Mannschaftslisten wird nicht angezeigt.

    private searchHomeSubject = new Subject<string>();
    private searchGuestSubject = new Subject<string>();

    homeTeamNameFilter = '';
    guestTeamNameFilter = '';
    dfbFilterValue: dfbFilterType = 'DFB';
    researchFilterValue: ResearchFilterType = 'HOME_AND_GUEST';

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
            this.researchService.findTeamsByFilter(searchValue, this.toTeamType()).subscribe((teams: Array<Rest.TeamJson>) => {
                this.homeTeams = teams;
            });
          });

        this.searchGuestSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
            this.researchService.findTeamsByFilter(searchValue, this.toTeamType()).subscribe((teams: Array<Rest.TeamJson>) => {
                this.guestTeams = teams;
            });
        });

        this.researchService.findDfbTeams().subscribe((teams: Array<Rest.TeamJson>) => {
            this.homeTeams = teams;
            this.guestTeams = teams;
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_RESEARCH);
        });
    }

    ngOnDestroy() {
        this.searchHomeSubject.complete();
        this.searchGuestSubject.complete();
    }

    private toTeamType(): Rest.TeamType | undefined {
        return this.dfbFilterValue === 'DFB' ? 'DFB' : 'FIFA';
    }

    changeTeamTypeFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if (value === 'DFB' || value === 'FIFA') {
            this.dfbFilterValue = value;
        }
        this.changeHomeTeamNameFilter();
        this.changeGuestTeamNameFilter();
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

    changeHomeAndGuestSelect(event: Event) {
        this.queryGames();
    }

    changeReverseSelect(event: Event) {
        this.queryGames();
    }

    private queryGames(): void {
        if (this.selectedHomeTeam && this.selectedGuestTeam) {
            this.contentReady.set(false);
            const spin = this.researchFilterValue === 'HOME_OR_GUEST';
            this.researchService.findGames(this.selectedHomeTeam.id, this.selectedGuestTeam.id, spin).subscribe(
                (history: Rest.HistoryTeamVsTeamJson) => {
                    this.games = history;
                    this.dates = this.games.games.map((game) => moment(game.matchDate).format('DD.MM.YYYY HH:mm'));
                },
                (error) => {
                    console.log(error);
                    this.contentReady.set(true);
                },
                () => {
                    this.contentReady.set(true);
                }
            );
        }
    }
}
