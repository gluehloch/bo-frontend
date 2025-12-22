import { Component, OnInit } from '@angular/core';

import { SeasonService } from './season.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from './../../environments/environment';

import { GamesPreprocessor, Processing, SeasonGroupRoundSelectorService } from '../shared/seasonroundgame/SeasonGroupRoundSelectorService';
import { RoundtableModel } from '../shared/seasonroundgame/RoundtableModel';
import { GoalsComponent } from '../shared/goals/goals.component';
import { GameResultComponent } from '../shared/gameresult/gameresult.component';
import { NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

class ExpandedGameDetail {
    expanded: boolean;
    readonly game: Rest.GameJson;

    constructor(expanded: boolean, game: Rest.GameJson) {
        this.expanded = expanded;
        this.game = game;
    }
}

@Component({
    selector: 'app-seasons',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css'],
    imports: [SpinnerComponent, FormsModule, GameResultComponent, GoalsComponent, NgClass, DatePipe],
    standalone: true,
})
export class SeasonComponent implements OnInit, Processing, GamesPreprocessor {

    loading = false;
    loadingCounter = 0;

    dateTimeFormat = environment.dateTimeFormat;
    roundtable: RoundtableModel;
    seasonGroupRoundSelectorService: SeasonGroupRoundSelectorService;
    /** Number == game.id */
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

    isExpanded(game: Rest.GameJson): boolean {
        const egd = this.expandedGames.get(game.id);
        return egd ? egd.expanded : false;
    }

    onClickDetails(game: Rest.GameJson): void {
        const egd = this.expandedGames.get(game.id);
        if (egd) {
            egd.expanded = !egd.expanded;    
        }
    }

    private findSeasons() {
        this.seasonGroupRoundSelectorService.findSeasons();
    }

    /* TODO remove 
    private findGroups(seasonId: number) {
        this.seasonGroupRoundSelectorService.findGroups(seasonId);
    }

    private findRounds(seasonId: number, groupId: number) {
        this.seasonGroupRoundSelectorService.findRounds(seasonId, groupId);
    }

    private findRoundAndTable(seasonId: number, roundId: number, groupId: number) {
        this.seasonGroupRoundSelectorService.findRoundAndTable(seasonId, roundId, groupId);
    }
    */

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
        this.seasonGroupRoundSelectorService.next();
    }

    last() {
        this.seasonGroupRoundSelectorService.last();
    }

    initGames(games: Rest.GameJson[]): void {
        this.expandedGames.clear();
        for (const game of games) {
            const expandedGameDetail = new ExpandedGameDetail(false, game);
            this.expandedGames.set(game.id, expandedGameDetail);
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
