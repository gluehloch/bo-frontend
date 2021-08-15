import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

import { RankingService } from './ranking.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';
import { SeasonService } from '../season/season.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

    readonly currentSeasonId = environment.currentSeasonId;
    readonly dateTimeFormat = environment.dateTimeFormat;

    seasons: Rest.SeasonJson[];
    selectedSeason: Rest.SeasonJson;
    ranking: Rest.UserTableJson;
    rankingRound: Rest.UserTableJson;

    constructor(
        private seasonService: SeasonService,
        private rankingService: RankingService,
        private navigationRouterService: NavigationRouterService) {
    }

    ngOnInit() {
        this.findSeasons();
        this.calculateRanking(this.currentSeasonId);
    }

    calculateRanking(seasonId: number) {
        this.rankingService.calculate(seasonId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculateRoundRankingOnly(userTable);
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_TEILNEHMER);
            this.selectedSeason = this.seasons.find(season => season.id == seasonId);
        });
    }

    next(roundId: number) {
        this.rankingService.nextRound(roundId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculateRoundRankingOnly(userTable);
        });
    }

    last(roundId: number) {
        this.rankingService.preRound(roundId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculateRoundRankingOnly(userTable);
        });
    }

    findTipp(match: Rest.GameJson, user: Rest.UserJson): Rest.GameTippJson  {
        return _.find(match.tipps, (t) => { return t.nickname === user.nickname });
    }

    findSeasons() {
        this.seasonService.findSeasons()
                          .subscribe((seasons: Rest.SeasonJson[]) => {
            this.seasons = seasons.sort((s1, s2) => s2.id - s1.id);
            this.selectedSeason = seasons[0];
        });
    }    

    seasonSelected(event: any) {
        console.debug('Selected season id: ', event);

        const selectedSeasonId = event.target.value;
        this.selectedSeason = this.seasons.find(season => season.id == selectedSeasonId);
        this.calculateRanking(this.selectedSeason.id);
    }

    private calculateRoundRankingOnly(userTable: Rest.UserTableJson) {
        this.ranking = userTable;
        this.rankingService.calculateRoundOnly(this.ranking.round.id)
                           .subscribe((userTableJson: Rest.UserTableJson) => {
            this.rankingRound = userTableJson;
        });
    }

}
