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

    currentSeasonId = environment.currentSeasonId;
    dateTimeFormat = environment.dateTimeFormat;

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

        this.rankingService.calculate(this.currentSeasonId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculatRoundRankingOnly(userTable);
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_TEILNEHMER);

            // TODO Die Meisterschaft in die Vorauswahl uebernehmen.
        });
    }

    next(roundId: number) {
        this.rankingService.nextRound(roundId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculatRoundRankingOnly(userTable);
        });
    }

    last(roundId: number) {
        this.rankingService.preRound(roundId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculatRoundRankingOnly(userTable);
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

    seasonSelected(event) {
        console.debug('Selected season id: ', event);

        const selectedSeasonId = event.target.value;
        const selectedSeason = this.seasons.find(season => season.id == selectedSeasonId);
        this.selectedSeason = selectedSeason;
    }

    private calculatRoundRankingOnly(userTable: Rest.UserTableJson) {
        this.ranking = userTable;
        this.rankingService.calculateRoundOnly(this.ranking.round.id)
                           .subscribe((userTableJson: Rest.UserTableJson) => {
            this.rankingRound = userTableJson;
        });
    }

}
