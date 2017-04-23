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
  table: Rest.RoundAndTableJson;
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
  }

  ngOnInit() {
    this.findSeasons();
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
                      .subscribe((season: Rest.SeasonJson) => {
      this.roundtable.rounds = season.rounds;
      this.roundtable.selectedRound = season.rounds[0];

      this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
    });
  }

  findRoundAndTable(roundId: number, groupId: number) {
    this.seasonService.findRound(roundId, groupId)
                      .subscribe((round: Rest.RoundAndTableJson) => {
      this.roundtable.table = round;
    });
  }

  // ------------------------------------------------------------------------------

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
    this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
  }

}
