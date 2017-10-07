import { Component, OnInit } from '@angular/core';

import { RankingService } from './ranking.service';
import { NavigationRouterService } from '../navigationrouter.service';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  ranking: Rest.UserTableJson;

  constructor(private rankingService: RankingService, private navigationRouterService: NavigationRouterService) {
    this.rankingService = rankingService;
  }

  ngOnInit() {
    // TODO Die Meisterschaft ist hier fest verdrahtet (=> 25).
    this.rankingService.calculate(26)
                       .subscribe((userTable: Rest.UserTableJson) => {
      this.ranking = userTable;
    });

    this.navigationRouterService.activate('TEILNEHMER');
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
