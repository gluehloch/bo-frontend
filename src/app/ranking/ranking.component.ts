import { Component, OnInit } from '@angular/core';

import { RankingService } from './ranking.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  currentSeasonId = environment.currentSeasonId;
  ranking: Rest.UserTableJson;

  constructor(
      private rankingService: RankingService,
      private navigationRouterService: NavigationRouterService) {
    this.rankingService = rankingService;
  }

  ngOnInit() {
    this.rankingService.calculate(this.currentSeasonId)
                       .subscribe((userTable: Rest.UserTableJson) => {
      this.ranking = userTable;
    });

    this.navigationRouterService.activate(NavigationRouterService.ROUTE_TEILNEHMER);
  }

  next(roundId: number) {
    this.rankingService.nextRound(roundId)
                       .subscribe((userTable: Rest.UserTableJson) => {
      this.ranking = userTable;
    });
  }

  last(roundId: number) {
    this.rankingService.preRound(roundId)
                       .subscribe((userTable: Rest.UserTableJson) => {
      this.ranking = userTable;
    });
  }

}
