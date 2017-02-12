import { Component, OnInit } from '@angular/core';

import { USERROLE } from '../user-role.enum';

import { SeasonService} from './season.service';

export class Roundtable {
  seasons: Rest.SeasonJson[];
  selectedSeason: Rest.SeasonJson;
  groups: Rest.GroupTypeJson[];
  selectedGroup: Rest.GroupTypeJson[];
  rounds: Rest.RoundJson[];
  selectedRound: Rest.RoundJson;
  table: Rest.RoundAndTableJson[];
};

@Component({
  selector: 'season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  roundtable: Roundtable;

  constructor(private seasonService: SeasonService) {
    this.roundtable = new Roundtable();
    this.roundtable.seasons = new Array();
  }

  ngOnInit() {
    this.findSeasons();
  }

  findSeasons() {
    this.seasonService.findSeasons().subscribe((seasons: Rest.SeasonJson[]) =>
      this.roundtable.seasons = seasons
    );
  }

  /*
    var callbackSeasons = function(seasons) {
        $scope.roundtable.seasons = seasons;
        $scope.roundtable.groups = [];
        $scope.roundtable.selectedGroup = null;
        $scope.roundtable.rounds = [];
        $scope.roundtable.selectedRound = null;
        $scope.roundtable.table = [];

        if (seasons !== null && seasons.length > 0) {
            $scope.roundtable.selectedSeason = seasons[seasons.length - 1].id;
            $scope.seasonSelected();
        }
    };
  */
}
