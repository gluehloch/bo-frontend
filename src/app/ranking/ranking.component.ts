import { Component, OnInit } from '@angular/core';

import { RankingService} from './ranking.service';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(private rankingService: RankingService) {
    this.rankingService = rankingService;
  }

  ngOnInit() {
  }

/*
    var seasonRankingCallback = function(rankingTable) {
        $scope.ranking = rankingTable;
    };

    $scope.next = function(round) {
        rankingFactory.nextRound(seasonRankingCallback, round.id);
    };

    $scope.last = function(round) {
        rankingFactory.prevRound(seasonRankingCallback, round.id);
    };

    rankingFactory.calculate(seasonRankingCallback, $routeParams.seasonId);
*/

}
