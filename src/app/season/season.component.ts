import { Component, OnInit } from '@angular/core';

import { USERROLE } from '../user-role.enum';

import { SeasonService} from './season.service';

export class Roundtable {
  seasons: Rest.SeasonJson[];
  selectedSeason: Rest.SeasonJson;
  groups: Rest.GroupTypeJson[];
  selectedGroup: Rest.GroupTypeJson;
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
    //this.roundtable.seasons = new Array();
  }

  ngOnInit() {
    this.findSeasons();

/*
      if (this.roundtable.seasons && this.roundtable.seasons.length > 0) {
        this.findGroups();
      }    

      if (this.roundtable.groups && this.roundtable.groups.length > 0) {
        this.findRounds();
      }
*/
  }

  findSeasons() {
    this.seasonService.findSeasons()
                      .subscribe((seasons: Rest.SeasonJson[]) => {
      this.roundtable.seasons = seasons;
      this.roundtable.selectedSeason = seasons[0];

      this.findGroups(this.roundtable.selectedSeason.id);
    });
  }

  findGroups(seasonId: number) {
    this.seasonService.findGroups(seasonId)
                      .subscribe((groups: Rest.GroupTypeJson[]) => {
      this.roundtable.groups = groups;
      this.roundtable.selectedGroup = groups[0];

      this.findRounds(this.roundtable.selectedSeason.id, this.roundtable.selectedGroup.id);
    });
  }

  findRounds(seasonId: number, groupId: number) {
    this.seasonService.findRounds(seasonId, groupId)
                      .subscribe((rounds: Rest.RoundJson[]) => {
      this.roundtable.rounds = rounds;
      this.roundtable.selectedRound = rounds[0];
    });
  }

  findRoundAndTable() {

  }

  seasonSelected(event) {
    console.info('Selected season id: ' + event.target.value);

    let selectedSeasonId = event.target.value;
    let selectedSeason = this.roundtable
                             .seasons
                             .find(season => season.id == selectedSeasonId);
    this.roundtable.selectedSeason = selectedSeason;
    this.findGroups(selectedSeasonId);
  }

  groupSelected(event) {
    console.info('Selected group id: ' + event.target.value);

    let selectedGroupId = event.target.value;
    let selectedGroup = this.roundtable
                            .groups
                            .find(group => group.id == selectedGroupId);
    this.roundtable.selectedGroup = selectedGroup;
    this.findRounds(this.roundtable.selectedSeason.id, selectedGroupId);
  }

  roundSelected(event) {
    console.info('Selected round id: ' + event.target.value);

    let selectedRound = this.roundtable
                            .rounds
                            .find(round => round.id == event.target.value);

    this.roundtable.selectedRound = selectedRound;
    this.findRoundAndTable();
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
