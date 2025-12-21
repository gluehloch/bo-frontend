import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRouterService } from '../navigationrouter.service';
import { FormsModule } from '@angular/forms';


import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResearchService } from './research.service';

import moment from 'moment';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

type dfbFilterType = 'DFB' | 'FIFA';
type ResearchFilterType = 'HOME_AND_GUEST' | 'HOME_OR_GUEST'
    | 'ONLY_HOME' | 'ONLY_GUEST' | 'BY_TEAM'
    | 'LAST_GAMES_HOME_TEAM' | 'LAST_GAMES_GUEST_TEAM';
type HomeOrGuestType = 'HOME' | 'GUEST';
@Component({
    selector: 'research',
    templateUrl: './research.component.html',
    styleUrls: ['./research.component.css'],
    imports: [FormsModule, SpinnerComponent]
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
            this.homeTeams.push(... teams);
            if (this.homeTeams) {
                this.selectedHomeTeam = this.homeTeams[0];
            }
            this.guestTeams.push(... teams);
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
                console.log('updateTeams -> findTeamsByFilter', error);
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

    changeHomeTeamNameFilter(event: any) {
        const team = event.target.value;
        this.homeTeamNameFilter = team;
        this.searchHomeSubject.next(team);
    }

    changeGuestTeamNameFilter(event: any) {
        const team = event.target.value;
        this.guestTeamNameFilter = team;
        this.searchGuestSubject.next(team);
    }

    selectHomeTeam(team: Rest.TeamJson) {
        this.queryGames(team, this.selectedGuestTeam);
    }

    selectGuestTeam(team: Rest.TeamJson) {
        this.queryGames(this.selectedHomeTeam, team);
    }

    changeHomeAndGuestSelect(event: Event) {
        this.queryGames(this.selectedHomeTeam, this.selectedGuestTeam);
    }

    changeReverseSelect(event: Event) {
        this.queryGames(this.selectedHomeTeam, this.selectedGuestTeam);
    }

    private queryGames(homeTeam: Rest.TeamJson | undefined, guestTeam: Rest.TeamJson | undefined): void {
        let obs: Observable<Rest.HistoryTeamVsTeamJson> | undefined;
        if (this.researchFilterValue === 'ONLY_HOME' && homeTeam) {
            obs = this.researchService.findGamesWithHomeTeam(homeTeam.id, this.limit);
        } else if (this.researchFilterValue === 'ONLY_GUEST' && guestTeam) {
            obs = this.researchService.findGamesWithGuestTeam(guestTeam.id, this.limit);
        } else if (this.researchFilterValue === 'LAST_GAMES_HOME_TEAM' && homeTeam) {
            obs = this.researchService.findGamesWithTeam(homeTeam.id, this.limit);
        } else if (this.researchFilterValue === 'LAST_GAMES_GUEST_TEAM' && guestTeam) {
            obs = this.researchService.findGamesWithTeam(guestTeam.id, this.limit);
        } else if (homeTeam && guestTeam) {
            const spin = this.researchFilterValue === 'HOME_OR_GUEST';
            obs = this.researchService.findGamesTeamVsTeam(homeTeam.id, guestTeam.id, spin, this.limit);
        } else {
            this.games?.games.splice(0, this.games.games.length);
            this.dates.splice(0, this.dates.length);
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
