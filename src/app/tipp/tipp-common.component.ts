import * as _ from 'lodash';

import { HttpErrorResponse } from '@angular/common/http';

import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';
import { Betoffice } from '../betoffice-json/model/betoffoce-data-model';

export class SubmitButtonModel {
    pressed = false;
    responseStatusCode = 200;  // HTTP Status Code 200 ok, > 400 problems
    responseErrorMessage = ''; // An error message
    progress = 0;
}

/**
 * Verwaltet einen Tipp fuer ein Spiel. Aenderung werden notiert
 * und durch die Methode #isModified() sichtbar.
 */
class TippModel {
    private oldHomeGoals: number;
    private oldGuestGoals: number;

    constructor(public game: Rest.GameJson, public homeGoals: number, public guestGoals: number, public points: number) {
        this.oldHomeGoals = homeGoals;
        this.oldGuestGoals = guestGoals;
    }

    public isModified(): boolean {
        return !(this.homeGoals === this.oldHomeGoals && this.guestGoals === this.oldGuestGoals);
    }
}

/**
 * Verwaltet den Tipp fuer eine Spielrunde fuer einen Spieler.
 */
class TippModelContainer {
    round: Rest.RoundJson;
    nickname: string;
    authenticated: boolean;
    summedUpPoints: number;
    modified: boolean;
    tippModels: TippModel[];

    constructor() {
        this.nickname = '';
        this.authenticated = false;
        this.summedUpPoints = 0;
        this.modified = false;
        this.tippModels = [];
        this.round = new Betoffice.RoundModel();
    }

    public reset() {
        this.tippModels = [];
    }

    public add(model: TippModel) {
        this.tippModels.push(model);
    }

    /**
     * Falls ein Tipp modifiziert wurde, gilt der komplette Tipp als
     * modifiziert.
     */
    public isModified(): boolean {
        const gm = _.find(this.tippModels, (tippModel: TippModel) => {
            return tippModel.isModified();
        });

        if (gm) {
            return gm.isModified();
        }
        return false;
    }

    public calcPoints() {
        this.summedUpPoints = 0;
        for (const tippModel of this.tippModels) {
            this.summedUpPoints = this.summedUpPoints + tippModel.points;
        }
    }
}

export abstract class TippCommonComponent /*implements OnInit*/ {

    dateTimeFormat = environment.dateTimeFormat;
    currentSeasonId = environment.currentSeasonId;

    submitButtonModel: SubmitButtonModel;
    navigationRouterService: NavigationRouterService;
    tippModelContainer = new TippModelContainer();

    season: Rest.SeasonJson | undefined;
    selectedRound: Rest.RoundJson | undefined;

    contentReady = false;

    constructor(private sessionService: SessionService, private tippService: TippService, navigationRouterService: NavigationRouterService) {
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
        if (this.sessionService.isAuthorized()) {
            this.tippModelContainer.nickname = this.sessionService.getNickname();
            this.tippModelContainer.authenticated = true;
        } else {
            this.tippModelContainer.nickname = '';
            this.tippModelContainer.authenticated = false;
        }
    }

    roundSelected(event: any) {
        console.debug('Selected round id: ' + event.target.value);

        const selectedRound = this.season?.rounds.find(round => round.id == event.target.value);

        this.selectedRound = selectedRound;
        if (this.selectedRound) {
            this.tippService.findTipp(this.selectedRound.id, this.tippModelContainer.nickname)
                .subscribe((roundJson: Rest.RoundJson) => {
                    this.updateModel(roundJson);
                });
        }
    }    

    private updateModel(roundJson: Rest.RoundJson) {
        if (!roundJson) return;
        roundJson.games = this.sortGames(roundJson.games);
        this.tippModelContainer.round = roundJson;

        // Es wird erwartet, dass das Backend nur einen Tipp zurueck gibt:
        // Der Tipp fuer den hier angemeldeten Teilnehmer. Falls er bisher
        // keinen Tipp abgegeben hat (oder nur fuer ein Spiel keinen Tipp
        // abgegeben hat), kann dieser 'null' sein.

        this.tippModelContainer.reset();
        for (const game of this.tippModelContainer.round.games) {
            let gameTippModel;
            if (game.tipps && game.tipps[0] && game.tipps[0].tipp) {
                gameTippModel = new TippModel(
                        game,
                        game.tipps[0].tipp.homeGoals,
                        game.tipps[0].tipp.guestGoals,
                        game.tipps[0].points);
            } else {
                console.log('Kein Tipp Gefunden', game);
                gameTippModel = new TippModel(game, 0, 0, 0);
            }
            this.tippModelContainer.add(gameTippModel);
        }

        this.tippModelContainer.modified = false;
        this.tippModelContainer.calcPoints();
        this.submitButtonModel.responseStatusCode = 0;
    }

    private updateContentReady() {
        this.contentReady = true;
    }

    onInit() {
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_TIPP);
        this.checkAuthorization();

        // TODO: Chaining von Observables. Schwierig. Im Gegensatz zu Promises nicht so intuitiv.
        if (this.tippModelContainer.authenticated) {
            this.tippService.rounds(this.currentSeasonId)
                .subscribe(seasonJson => {
                    this.season = seasonJson;
                    this.tippService.currentRound(this.currentSeasonId, this.tippModelContainer.nickname)
                        .subscribe({
                            next: (roundJson: Rest.RoundJson) => {
                                if (roundJson) {
                                    this.updateModel(roundJson);
                                } else {
                                    this.tippService.findTipp(seasonJson.rounds[0].id, this.tippModelContainer.nickname)
                                        .subscribe(rr => {
                                            this.updateModel(rr);
                                        });
                                }
                            }, 
                            complete: () => {
                                this.updateContentReady();
                        },
                    });
                });
        }
    }

    next() {
        if (this.tippModelContainer.isModified()) {
            this.tippModelContainer.modified = true;
        } else {
            this.tippService.nextRound(this.tippModelContainer.round.id, this.tippModelContainer.nickname)
                .subscribe((roundJson: Rest.RoundJson) => {
                    this.updateModel(roundJson);
                });
        }
    }

    last() {
        if (this.tippModelContainer.isModified()) {
            this.tippModelContainer.modified = true;
        } else {
            this.tippService.prevRound(this.tippModelContainer.round.id, this.tippModelContainer.nickname)
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
            nickname: this.tippModelContainer.nickname,
            roundId: this.tippModelContainer.round.id,
            submitTippGames: [] as Betoffice.SubmitTippGameModel[],
        };

        this.tippModelContainer.tippModels.forEach(tippModel => {
            submitTipp.submitTippGames.push({
                gameId: tippModel.game.id,
                tippResult: {
                    homeGoals: tippModel.homeGoals,
                    guestGoals: tippModel.guestGoals
                }
            });
        });

        this.tippService.tipp(submitTipp)
            .subscribe({
                next: (roundJson: Rest.RoundJson) => {
                    this.updateModel(roundJson);
                    this.submitButtonModel.pressed = false;
                    this.submitButtonModel.responseStatusCode = 200;
                    this.submitButtonModel.progress = 100;
                },
                error: (err: HttpErrorResponse) => {
                    this.submitButtonModel.pressed = false;
                    this.submitButtonModel.responseStatusCode = err.status;
                    this.submitButtonModel.responseErrorMessage = err.error;
                    this.submitButtonModel.progress = 100;
                    if (err.status === 403 || err.status === 401) {
                        console.log('Access denied.');
                        this.sessionService.clearCredentials();
                    } else if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred:', err.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                },
            });
    }

}
