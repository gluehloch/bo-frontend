import { Component, OnInit } from '@angular/core';

import { RankingService} from './ranking.service';

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

/*
  findSeasons() {
    this.seasonService.findSeasons()
                      .subscribe((seasons: Rest.SeasonJson[]) => {
      this.roundtable.seasons = seasons;
      this.roundtable.selectedSeason = seasons[0];

      this.findGroups(this.roundtable.selectedSeason.id);
    });
  }
*/

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
