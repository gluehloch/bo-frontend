import { Component, OnInit } from '@angular/core';

import { SeasonService } from './season.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from './../../environments/environment';
import { Sorting } from '../betoffice-json/model/Sorting';
import { GamesPreprocessor, Processing, SeasonGroupRoundSelectorService } from '../components/seasonroundgame/SeasonGroupRoundSelectorService';
import { RoundtableModel } from '../components/seasonroundgame/RoundtableModel';

class ExpandedGameDetail {
    expanded = false;
    detail: Rest.GameDetailsJson | undefined;
    game: Rest.GameJson | undefined;
}

@Component({
    selector: 'app-seasons',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit, Processing, GamesPreprocessor {

    loading = false;
    loadingCounter = 0;

    dateTimeFormat = environment.dateTimeFormat;
    roundtable: RoundtableModel;
    seasonGroupRoundSelectorService: SeasonGroupRoundSelectorService;
    expandedGames: Map<number, ExpandedGameDetail> = new Map<number, ExpandedGameDetail>();

    constructor(private seasonService: SeasonService, private navigationRouterService: NavigationRouterService) {
        this.roundtable = new RoundtableModel();
        this.seasonGroupRoundSelectorService = new SeasonGroupRoundSelectorService(this, this.seasonService, this.roundtable, this);
    }

    ngOnInit() {
        this.findSeasons();
    }

    start(): void {
        this.addLoading();
    }

    stop(): void {
        this.removeLoading();
    }

    private addLoading() {
        this.loadingCounter++;
        this.loading = true;
    }

    private removeLoading() {
        this.loadingCounter--;
        if (this.loadingCounter <= 0) {
            this.loading = false;
        }
    }

    private sortGames(games: Rest.GameJson[]): Rest.GameJson[] {
        return games.sort((g1, g2) => {
            const date1 = new Date(g1.dateTime);
            const date2 = new Date(g2.dateTime);
            return date1.getTime() - date2.getTime();
        });
    }

    findSeasons() {
        this.seasonGroupRoundSelectorService.findSeasons();
    }

    findGroups(seasonId: number) {
        this.seasonGroupRoundSelectorService.findGroups(seasonId);
    }

    findRounds(seasonId: number, groupId: number) {
        this.seasonGroupRoundSelectorService.findRounds(seasonId, groupId);
    }

    findRoundAndTable(roundId: number, groupId: number) {
        this.seasonGroupRoundSelectorService.findRoundAndTable(roundId, groupId);
    }

    seasonSelected(event: any) {
        console.debug('Selected season id: ', event.target.value);
        this.seasonGroupRoundSelectorService.seasonSelected(event.target.value);
    }

    groupSelected(event: any) {
        console.debug('Selected group id: ', event.target.value);
        this.seasonGroupRoundSelectorService.groupSelected(event.target.value);
    }

    roundSelected(event: any) {
        console.debug('Selected round id: ', event.target.value);
        this.seasonGroupRoundSelectorService.roundSelected(event.target.value);
    }

    next() {
        const selectedRoundIndex = this.roundtable
                                  .rounds
                                  .findIndex(round => round.id == this.roundtable.selectedRound?.id);
        if (selectedRoundIndex < this.roundtable.rounds.length - 1) {
            const nextRound = this.roundtable.rounds[selectedRoundIndex + 1];
            this.roundtable.selectedRound = nextRound;
            if (this.roundtable.selectedRound && this.roundtable.selectedGroup) {
                this.findRoundAndTable(nextRound.id, this.roundtable.selectedGroup.id);
            }
        }
    }

    last() {
        const selectedRoundIndex = this.roundtable
                                  .rounds
                                  .findIndex(round => round.id == this.roundtable.selectedRound?.id);
        if (selectedRoundIndex > 0) {
            const lastRound = this.roundtable.rounds[selectedRoundIndex - 1];
            this.roundtable.selectedRound = lastRound;
            if (this.roundtable.selectedRound && this.roundtable.selectedGroup) {
                this.findRoundAndTable(lastRound.id, this.roundtable.selectedGroup.id);
            }
        }
    }

    initGames(games: Rest.GameJson[]): void {
        this.expandedGames.clear();
        for (const game of games) {
            const expandedGameDetail = new ExpandedGameDetail();
            expandedGameDetail.expanded = false;
            expandedGameDetail.detail = undefined;
            expandedGameDetail.game = game;
            this.expandedGames.set(game.id, expandedGameDetail);
        }        
    }

    onClickDetails(game: Rest.GameJson): void {
        const expandedGameDetail = this.expandedGames.get(game.id);
        if (expandedGameDetail === undefined) {
            console.error('No expanded game detail found for game: ', game);
            return;
        }
        expandedGameDetail.expanded = !expandedGameDetail.expanded;

        if (expandedGameDetail.expanded && expandedGameDetail.detail === undefined) {
            this.addLoading();
            this.seasonService
                .findGameDetails(game.id)
                .subscribe(
                    (gameDetails: Rest.GameDetailsJson) => {
                        expandedGameDetail.detail = gameDetails;
                        console.debug('Completed loading game details for game: ', game, gameDetails);
                    },
                    (error: any) => {
                        console.error('Error while loading game details for game: ', game, error);
                    },
                    () => {
                        this.removeLoading();
                    }
                );
        }
    }

    getColor(i: number) {
        if (i === 0) {
            return 'table-success';
        } else if (i >= 1 && i <= 3) {
            return 'table-info';
        } else if (i >= 4 && i <= 5) {
            return 'table-warning';
        } else if (i >= 15 && i <= 17) {
            return 'table-danger';
        }
    }
}
