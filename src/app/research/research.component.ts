import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRouterService } from '../navigationrouter.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResearchService } from './research.service';

import * as moment from 'moment';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

type dfbFilterType = 'DFB' | 'FIFA';
type ResearchFilterType = 'HOME_AND_GUEST' | 'HOME_OR_GUEST' | 'ONLY_HOME' | 'ONLY_GUEST' | 'BY_TEAM';
type HomeOrGuestType = 'HOME' | 'GUEST';
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

    limit = 100;
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
            this.updateTeams(searchValue, this.homeTeams, 'HOME');
        });

        this.searchGuestSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
            this.updateTeams(searchValue, this.guestTeams, 'GUEST');
        });

        this.researchService.findDfbTeams().subscribe((teams: Array<Rest.TeamJson>) => {
            this.homeTeams = teams;
            if (this.homeTeams) {
                this.selectedHomeTeam = this.homeTeams[0];
            }
            this.guestTeams = teams;
            if (this.guestTeams) {
                this.selectedGuestTeam = this.guestTeams[0];
            }
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_RESEARCH);
        });
    }

    private updateTeams(searchValue: string, teams: Rest.TeamJson[], homeOrGuest: HomeOrGuestType) {
        this.researchService.findTeamsByFilter(searchValue, this.toTeamType()).subscribe(
            (_teams: Array<Rest.TeamJson>) => {
                teams.splice(0, teams.length);
                teams.push(... _teams);
                if (homeOrGuest === 'HOME') {
                    this.selectedHomeTeam = teams[0];
                } else {
                    this.selectedGuestTeam = teams[0];
                }
            },
            (error) => {
                console.log('guestTeams -> findTeamsByFilter', error);
            }                
        );        
    }

    ngOnDestroy() {
        this.searchHomeSubject.complete();
        this.searchGuestSubject.complete();
    }

    private toTeamType(): Rest.TeamType | undefined {
        return this.dfbFilterValue === 'DFB' ? 'DFB' : 'FIFA';
    }

    changeTeamTypeFilter(event: Event) {
        this.updateTeams(this.homeTeamNameFilter, this.homeTeams, 'HOME');
        this.updateTeams(this.guestTeamNameFilter, this.guestTeams, 'GUEST');
    }

    changeHomeTeamNameFilter() {
        this.searchHomeSubject.next(this.homeTeamNameFilter);
    }

    changeGuestTeamNameFilter() {
        this.searchGuestSubject.next(this.guestTeamNameFilter);
    }

    selectHomeTeam(event: unknown) {
        console.log('selectedHomeTeam:', this.selectedHomeTeam, event);
        this.queryGames();
    }

    selectGuestTeam(event: unknown) {
        console.log('selectedGuestTeam:', this.selectedHomeTeam, event);
        this.queryGames();
    }

    changeHomeAndGuestSelect(event: Event) {
        this.queryGames();
    }

    changeReverseSelect(event: Event) {
        this.queryGames();
    }

    private queryGames(): void {
        let obs: Observable<Rest.HistoryTeamVsTeamJson> | undefined;
        if (this.researchFilterValue === 'ONLY_HOME' && this.selectedHomeTeam) {
            this.contentReady.set(false);
            obs = this.researchService.findGamesWithHomeTeam(this.selectedHomeTeam.id, this.limit);
        } else if (this.researchFilterValue === 'ONLY_GUEST' && this.selectedGuestTeam) {
            this.contentReady.set(false);
            obs = this.researchService.findGamesWithGuestTeam(this.selectedGuestTeam.id, this.limit);
        } else if (this.selectedHomeTeam && this.selectedGuestTeam) {
            this.contentReady.set(false);
            const spin = this.researchFilterValue === 'HOME_OR_GUEST';
            obs = this.researchService.findGamesTeamVsTeam(this.selectedHomeTeam.id, this.selectedGuestTeam.id, spin, this.limit);
        } else {
            this.games = undefined;
            this.dates = [];
        }

        if (obs) {
            this.contentReady.set(false);
            obs.subscribe(
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
