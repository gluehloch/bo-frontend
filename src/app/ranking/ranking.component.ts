import { Component, OnInit } from '@angular/core';

import { RankingService } from './ranking.service';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  ranking: Rest.UserTableJson;

  constructor(private rankingService: RankingService) {
    this.rankingService = rankingService;
  }

  ngOnInit() {
    // TODO Die Meisterschaft ist hier fest verdrahtet.
    this.rankingService.calculate(25)
                       .subscribe((userTable: Rest.UserTableJson) => {
      this.ranking = userTable;
    });
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
