import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { USERROLE } from '../../user-role.enum';

import { UpdateMatchdayService } from './updatematchday.service';
import { ModalService } from './../../modal/modal.service';

export class Roundtable {
  seasonId: number;
  groups: Rest.GroupTypeJson[];
  selectedGroup: Rest.GroupTypeJson;
  rounds: Rest.RoundJson[];
  selectedRound: Rest.RoundJson;
  table: Rest.RoundAndTableJson;
};

@Component({
  selector: 'app-seasons',
  templateUrl: './updatematchday.component.html',
  styleUrls: ['./updatematchday.component.css']
})
export class UpdateMatchdayComponent implements OnInit {

  roundtable: Roundtable;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private updateMatchdayService: UpdateMatchdayService,
      private modalService: ModalService) {
    this.roundtable = new Roundtable();
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((seasonId) => {
      this.roundtable.seasonId = seasonId;
      console.log('Update a match day of season ' + this.roundtable.seasonId);
      this.findGroups(this.roundtable.seasonId);
      // this.updateMatchdayService.findRounds(seasonId);
      // this.roundtable.selectedSeason = season;
      // this.findGroups(season.id);
/*
      this.seasonManagerUpdateService.findParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => this.model.parties = parties);

      this.seasonManagerUpdateService.findPotentialParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => this.model.potentialParties = parties);
*/
    });

  }
/*
  findSeasons() {
    this.updateMatchdayService.findSeasons()
                      .subscribe((seasons: Rest.SeasonJson[]) => {
      this.roundtable.seasons = seasons;
      this.roundtable.selectedSeason = seasons[0];

      this.findGroups(this.roundtable.selectedSeason.id);
    });
  }
*/

  findGroups(seasonId: number) {
    this.updateMatchdayService.findGroups(seasonId)
                      .subscribe((groups: Rest.GroupTypeJson[]) => {
      this.roundtable.groups = groups;
      this.roundtable.selectedGroup = groups[0];

      this.findRounds(this.roundtable.seasonId, this.roundtable.selectedGroup.id);
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

  groupSelected(event) {
    console.info('Selected group id: ' + event.target.value);

    const selectedGroupId = event.target.value;
    const selectedGroup = this.roundtable
                            .groups
                            .find(group => group.id === parseInt(selectedGroupId, 10));
    this.roundtable.selectedGroup = selectedGroup;
    this.findRounds(this.roundtable.seasonId, selectedGroupId);
  }

  roundSelected(event) {
    console.info('Selected round id: ' + event.target.value);

    const selectedRoundId = event.target.value;
    const selectedRound = this.roundtable
                            .rounds
                            .find(round => round.id === parseInt(selectedRoundId, 10));

    this.roundtable.selectedRound = selectedRound;
    this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
  }

  updateMatchDay() {
    console.info('Update round ' + this.roundtable.selectedRound.id);
    this.updateMatchdayService.updateMatchday(this.roundtable.table.roundJson, this.roundtable.selectedGroup)
      .subscribe((round: Rest.RoundAndTableJson) => {
        this.roundtable.table = round;
    });
  }

  updateOpenligaDb() {
    console.info('Update with OpenligaDB round ' + this.roundtable.selectedRound.id);
    this.updateMatchdayService.updateByOpenligaDb(this.roundtable.table.roundJson.id, this.roundtable.selectedGroup.id)
      .subscribe(
        success => (round: Rest.RoundAndTableJson) => {
          this.roundtable.table = round;
        },
        error => {
          this.modalService.open('4711');
        }
      );
  }

  createOpenligaDb() {
    console.info('Create with OpenligaDB.');
    this.updateMatchdayService.createOrUpdateByOpenligaDb(this.roundtable.table.roundJson.id, this.roundtable.selectedGroup.id)
      .subscribe((round: Rest.RoundAndTableJson) => {
        this.roundtable.table = round;
    });
  }

}
