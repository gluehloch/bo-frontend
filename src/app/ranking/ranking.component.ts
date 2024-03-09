import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

import { RankingService } from './ranking.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';
import { SeasonService } from '../season/season.service';
import { Betoffice } from '../betoffice-json/model/betoffice-data-model';
import { Sorting } from '../betoffice-json/model/Sorting';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

    readonly currentSeasonId = environment.currentSeasonId;
    readonly dateTimeFormat = environment.dateTimeFormat;

    contentReady = false;
    seasons: Betoffice.SeasonModel[] = [];
    selectedSeason: Betoffice.SeasonModel | undefined;

    ranking = new Betoffice.UserTableModel();
    rankingRound = new Betoffice.UserTableModel();

    constructor(
        private seasonService: SeasonService,
        private rankingService: RankingService,
        private navigationRouterService: NavigationRouterService) {
    }

    ngOnInit() {
        this.findSeasons();
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

    findTipp(match: Rest.GameJson, user: Rest.UserJson): Rest.GameTippJson | undefined {
        const tipp = _.find(match.tipps, (t) => t.nickname === user.nickname);
        return tipp;
    }

    findSeasons() {
        this.seasonService.findSeasons()
                          .subscribe((seasons: Rest.SeasonJson[]) => {
            this.seasons = seasons.sort(Sorting.compareSeason);
            /*
            this.seasons = seasons.sort((s1, s2) => {
                const x = s1.year.localeCompare(s2.year);
                if (x === 0) {
                    return - s1.name.localeCompare(s2.name);
                }
                return - x;
            });
            */
            this.selectedSeason = seasons[0];
            this.calculateRanking(this.currentSeasonId);
        });
    }

    seasonSelected(event: any) {
        console.debug('Selected season id: ', event);

        const selectedSeasonId = event.target.value;
        this.selectedSeason = this.seasons.find(season => season.id == selectedSeasonId);
        if (this.selectedSeason) {
            this.calculateRanking(this.selectedSeason.id);
        }
    }

    private calculateRanking(seasonId: number) {
        this.rankingService.calculate(seasonId)
                           .subscribe((userTable: Rest.UserTableJson) => {
            this.calculateRoundRankingOnly(userTable);
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_TEILNEHMER);
            this.selectedSeason = this.seasons.find(season => season.id == seasonId);
        });
    }
    
    private calculateRoundRankingOnly(userTable: Rest.UserTableJson) {
        this.ranking = userTable;
        this.rankingService.calculateRoundOnly(this.ranking.round.id)
                           .subscribe((userTableJson: Rest.UserTableJson) => {
            this.rankingRound = userTableJson;
            this.contentReady = true;
        });
    }

}
