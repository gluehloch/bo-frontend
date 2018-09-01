import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

import { USERROLE } from '../user-role.enum';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

export class SubmitButtonModel {
    pressed: boolean;
    responseStatusCode: number; // HTTP Status Code 200 ok, > 400 problems
    responseErrorMessage: String; // An error message
    progress: number;
}

export class TippModel {
    nickname: string;
    authenticated: boolean;
    round: Rest.RoundJson;
    points: number;

    calcPoints() {
        this.points = 0;
        for (const game of this.round.games) {
            this.points = this.points + game.tipps[0].points;
        }
    }
}

export class TippCommonComponent implements OnInit, OnChanges {

    currentSeasonId = environment.currentSeasonId;

    tippModel: TippModel;
    submitButtonModel: SubmitButtonModel;
    navigationRouterService: NavigationRouterService;

    constructor(private cookieService: CookieService, private tippService: TippService, navigationRouterService: NavigationRouterService) {
        this.tippModel = new TippModel();
        this.submitButtonModel = new SubmitButtonModel();
        this.submitButtonModel.progress = 0;
        this.navigationRouterService = navigationRouterService;
    }

    sortGames(games: Rest.GameJson[]): Rest.GameJson[] {
        return games.sort((g1, g2) => {
            const date1 = new Date(g1.dateTime);
            const date2 = new Date(g2.dateTime);
            return date1.getTime() - date2.getTime();
        });
    }

    checkAuthorization() {
        if (this.tippService.isAuthorized()) {
            this.tippModel.nickname = this.tippService.readCredentials().nickname;
            this.tippModel.authenticated = true;
        } else {
            this.tippModel.nickname = null;
            this.tippModel.authenticated = false;
        }
    }

    ngOnInit() {
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_TIPP);
        this.checkAuthorization();

        if (this.tippModel.authenticated) {
            this.tippService.nextTippRound(this.currentSeasonId, this.tippModel.nickname)
                .subscribe((roundJson: Rest.RoundJson) => {
                    roundJson.games = this.sortGames(roundJson.games);
                    this.tippModel.round = roundJson;
                    this.tippModel.calcPoints();
                });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        console.dir(changes);
    }

    next() {
        this.tippService.nextRound(this.tippModel.round.id, this.tippModel.nickname)
            .subscribe((roundJson: Rest.RoundJson) => {
                roundJson.games = this.sortGames(roundJson.games);
                this.tippModel.round = roundJson;
                this.tippModel.calcPoints();
                this.submitButtonModel.responseStatusCode = 0;
            });
    }

    last() {
        this.tippService.prevRound(this.tippModel.round.id, this.tippModel.nickname)
            .subscribe((roundJson: Rest.RoundJson) => {
                roundJson.games = this.sortGames(roundJson.games);
                this.tippModel.round = roundJson;
                this.tippModel.calcPoints();
                this.submitButtonModel.responseStatusCode = 0;
            });
    }

    submitTipp() {
        this.submitButtonModel.pressed = true;
        this.submitButtonModel.responseStatusCode = 0;
        this.submitButtonModel.responseErrorMessage = '';
        this.submitButtonModel.progress = 33;

        const submitTipp = {
            nickname: this.tippModel.nickname,
            roundId: this.tippModel.round.id,
            submitTippGames: []
        };

        this.tippModel.round.games.forEach(game => {
            submitTipp.submitTippGames.push({
                gameId: game.id, tippResult: {
                    homeGoals: game.tipps[0].tipp.homeGoals,
                    guestGoals: game.tipps[0].tipp.guestGoals
                }
            }
            );
        });

        this.tippService.tipp(submitTipp)
            .subscribe((roundJson: Rest.RoundJson) => {
                roundJson.games = this.sortGames(roundJson.games);
                this.tippModel.round = roundJson;
                this.submitButtonModel.pressed = false;
                this.submitButtonModel.responseStatusCode = 200;
                this.submitButtonModel.progress = 100;
            },
                (err: HttpErrorResponse) => {
                    this.submitButtonModel.pressed = false;
                    this.submitButtonModel.responseStatusCode = err.status;
                    this.submitButtonModel.responseErrorMessage = err.error;
                    this.submitButtonModel.progress = 100;
                    if (err.status == 403) {
                        console.log('Access denied.');
                        this.tippService.clearCredentials();
                    } else if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred:', err.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                });
    }

}
