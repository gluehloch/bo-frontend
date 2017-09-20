import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { USERROLE } from '../../user-role.enum';

import { UpdateMatchdayService } from './updatematchday.service';

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
  selector: 'seasons',
  templateUrl: './updatematchday.component.html',
  styleUrls: ['./updatematchday.component.css']
})
export class UpdateMatchdayComponent implements OnInit {

  roundtable: Roundtable;

  constructor(private router: Router, private route: ActivatedRoute, private updateMatchdayService: UpdateMatchdayService) {
    this.roundtable = new Roundtable();
  }

  ngOnInit() {
    this.findSeasons();

    /* Falls ein Meisterschaftsparameter vorhanden ist, könnte hier auch gleich die
       richtige Meisterschaft selektiert werden.
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.seasonManagerUpdateService.findSeason(id).subscribe(
        (season: Rest.SeasonJson) => this.model.season = season);

      this.seasonManagerUpdateService.findParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => this.model.parties = parties);

      this.seasonManagerUpdateService.findPotentialParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => this.model.potentialParties = parties);
    });
    */
  }

  findSeasons() {
    this.updateMatchdayService.findSeasons()
                      .subscribe((seasons: Rest.SeasonJson[]) => {
      this.roundtable.seasons = seasons;
      this.roundtable.selectedSeason = seasons[0];

      this.findGroups(this.roundtable.selectedSeason.id);
    });
  }

  findGroups(seasonId: number) {
    this.updateMatchdayService.findGroups(seasonId)
                      .subscribe((groups: Rest.GroupTypeJson[]) => {
      this.roundtable.groups = groups;
      this.roundtable.selectedGroup = groups[0];

      this.findRounds(this.roundtable.selectedSeason.id, this.roundtable.selectedGroup.id);
    });
  }

  findRounds(seasonId: number, groupId: number) {
    this.updateMatchdayService.findRounds(seasonId, groupId)
                      .subscribe((season: Rest.SeasonJson) => {
      this.roundtable.rounds = season.rounds;
      this.roundtable.selectedRound = season.rounds[0];

      this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
    });
  }

  findRoundAndTable(roundId: number, groupId: number) {
    this.updateMatchdayService.findRound(roundId, groupId)
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

  updateMatchdDay() {
    console.info('Update round ' + this.roundtable.selectedRound.id);
    this.updateMatchdayService.updateMatchday(this.roundtable.table.roundJson, this.roundtable.selectedGroup).subscribe((round: Rest.RoundAndTableJson) => {
      this.roundtable.table = round;
    });
  }

  updateOpenligaDb() {
    console.info('Update with OpenligaDB round ' + this.roundtable.selectedRound.id);
    this.updateMatchdayService.updateByOpenligaDb(this.roundtable.table.roundJson.id, this.roundtable.selectedGroup.id).subscribe((round: Rest.RoundAndTableJson) => {
      this.roundtable.table = round;
    });
  }

  createOpenligaDb() {
    console.info('Create with OpenligaDB.');
    this.updateMatchdayService.createOrUpdateByOpenligaDb(this.roundtable.table.roundJson.id, this.roundtable.selectedGroup.id).subscribe((round: Rest.RoundAndTableJson) => {
      this.roundtable.table = round;
    });
  }

}
