import * as _ from 'lodash';

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

import { TippService, PingJson } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

export class SubmitButtonModel {
    pressed: boolean;
    responseStatusCode: number; // HTTP Status Code 200 ok, > 400 problems
    responseErrorMessage: String; // An error message
    progress: number;
}

class RoundModel implements Rest.RoundJson {
    id: number;
    seasonId: number;
    seasonName: string;
    seasonYear: string;
    dateTime: Date;
    index: number;
    lastRound: boolean;
    tippable: boolean;
    games: Rest.GameJson[];
}

class GameModel implements Rest.GameJson {
    id: number;
    index: number;
    roundId: number;
    dateTime: string;
    homeTeam: Rest.TeamJson;
    guestTeam: Rest.TeamJson;
    halfTimeResult: Rest.GameResultJson;
    result: Rest.GameResultJson;
    overtimeResult: Rest.GameResultJson;
    penaltyResult: Rest.GameResultJson;
    finished: boolean;
    ko: boolean;
    tipps: Rest.GameTippJson[];
    openligaid: number;
}

class GameTippModel implements Rest.GameTippJson {
    nickname: string;
    tipp: Rest.GameResultJson;
    points: number;
}

class GoalModel implements Rest.GameResultJson {
    private _homeGoals: number;
    private _guestGoals: number;
    private _oldHomeGoals: number;
    private _oldGuestGoals: number;

    constructor(home: number, guest: number) {
        this._homeGoals = home;
        this._guestGoals = guest;
        this._oldHomeGoals = home;
        this._oldGuestGoals = guest;
    }

    get homeGoals(): number {
        return this._homeGoals;
    }

    set homeGoals(homeGoals: number) {
        this._homeGoals = homeGoals;
    }

    get guestGoals(): number {
        return this._guestGoals;
    }

    set guestGoals(guestGoals: number) {
        this._guestGoals = guestGoals;
    }

    public isModified(): boolean {
        return !(this._homeGoals === this._oldHomeGoals && this._guestGoals === this._oldGuestGoals);
    }
}

class GoalModelContainer {
    private _goalModels: GoalModel[];

    public reset() {
        this._goalModels = [];
    }

    public add(model: GoalModel) {
        this._goalModels.push(model);
    }

    public model(): GoalModel[] {
        return this._goalModels;
    }

    public isModified(): boolean {
        const gm = _.find(this._goalModels, (goalModel: GoalModel) => {
            return goalModel.isModified();
        });

        if (gm) {
            return gm.isModified();
        }
        return false;
    }
}

export class TippModel {
    nickname: string;
    authenticated: boolean;
    round: Rest.RoundJson;
    points: number;
    modified: boolean;

    calcPoints() {
        this.points = 0;
        for (const game of this.round.games) {
            this.points = this.points + game.tipps[0].points;
        }
    }
}

export class TippCommonComponent implements OnInit {

    dateTimeFormat = environment.dateTimeFormat;
    currentSeasonId = environment.currentSeasonId;

    tippModel: TippModel;
    submitButtonModel: SubmitButtonModel;
    navigationRouterService: NavigationRouterService;
    goalModelContainer = new GoalModelContainer();

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

    private updateModel(roundJson: Rest.RoundJson) {
        roundJson.games = this.sortGames(roundJson.games);
        this.tippModel.round = roundJson;

        this.goalModelContainer.reset();
        for (const game of this.tippModel.round.games) {
            const gameTippModel = new GoalModel(game.tipps[0].tipp.homeGoals, game.tipps[0].tipp.guestGoals);
            this.goalModelContainer.add(gameTippModel);
            game.tipps[0].tipp = gameTippModel;
        }

        this.tippModel.modified = false;
        this.tippModel.calcPoints();
        this.submitButtonModel.responseStatusCode = 0;
    }

    ngOnInit() {
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_TIPP);
        this.checkAuthorization();

        if (this.tippModel.authenticated) {
            this.tippService.nextTippRound(this.currentSeasonId, this.tippModel.nickname)
                .subscribe((roundJson: Rest.RoundJson) => {
                    this.updateModel(roundJson);

                    /* TODO AWI Zeitstempel vom Server abfragen.
                    this.tippService.dateTime().subscribe((pingJson: PingJson) => {
                        console.log(JSON.stringify(pingJson));
                        console.log('Datum: ' + pingJson.dateTime + ' Zeitzone: ' + pingJson.dateTimeZone);
                    });
                    */
                });
        }
    }

    next() {
        if (this.goalModelContainer.isModified()) {
            this.tippModel.modified = true;
        } else {
            this.tippService.nextRound(this.tippModel.round.id, this.tippModel.nickname)
                .subscribe((roundJson: Rest.RoundJson) => {
                    this.updateModel(roundJson);
                });
        }
    }

    last() {
        if (this.goalModelContainer.isModified()) {
            this.tippModel.modified = true;
        } else {
            this.tippService.prevRound(this.tippModel.round.id, this.tippModel.nickname)
                .subscribe((roundJson: Rest.RoundJson) => {
                    this.updateModel(roundJson);
                });
        }
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
                this.updateModel(roundJson);
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
