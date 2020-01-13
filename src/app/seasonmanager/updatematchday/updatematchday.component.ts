import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(private router: Router,
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
        });
    }

    private findGroups(seasonId: number) {
        this.updateMatchdayService.findGroups(seasonId)
                                  .subscribe((groups: Rest.GroupTypeJson[]) => {
                                      this.roundtable.groups = groups;
                                      this.roundtable.selectedGroup = groups[0];
                                      this.findRounds(this.roundtable.seasonId, this.roundtable.selectedGroup.id);
                                  });
    }

    private findRounds(seasonId: number, groupId: number) {
        this.updateMatchdayService.findRounds(seasonId, groupId)
                                  .subscribe((season: Rest.SeasonJson) => {
                                      this.roundtable.rounds = season.rounds;
                                      if (season.currentRoundId) {
                                          const index = _.findIndex(this.roundtable.rounds, e => { return e.id === season.currentRoundId});
                                          if (index === -1) {
                                              // In der Gruppenphase kann es durchaus moeglich sein,
                                              // dass fuer den aktuellen Spieltag in dieser Gruppe kein Spieltag
                                              // vorgesehen ist. Mmh. Das ist jetzt bloed. Also default:
                                              this.roundtable.selectedRound = season.rounds[0];
                                          } else {
                                              this.roundtable.selectedRound = season.rounds[index];
                                          }
                                      } else {
                                          this.roundtable.selectedRound = season.rounds[0];
                                      }
                                      this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
                                  });
    }

    private findRoundAndTable(roundId: number, groupId: number) {
        this.updateMatchdayService.findRound(roundId, groupId)
                                  .subscribe((round: Rest.RoundAndTableJson) => {
                                      this.roundtable.table = round;
                                  });
    }

    // ------------------------------------------------------------------------------

    groupSelected(event) {
        // console.info('Selected group id: ' + event.target.value);

        const selectedGroupId = event.target.value;
        const selectedGroup = this.roundtable.groups
                                  .find(group => group.id === parseInt(selectedGroupId, 10));
        this.roundtable.selectedGroup = selectedGroup;
        this.findRounds(this.roundtable.seasonId, selectedGroupId);
    }

    roundSelected(event) {
        // console.info('Selected round id: ' + event.target.value);

        const selectedRoundId = event.target.value;
        const selectedRound = this.roundtable.rounds
                                  .find(round => round.id === parseInt(selectedRoundId, 10));

        this.roundtable.selectedRound = selectedRound;
        this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
    }

    updateMatch(game: Rest.GameJson) {
        this.router.navigate(['./chiefop/seasonmanager/updatematch', game.id]);
    }

    updateMatchDay() {
        // console.info('Update round ' + this.roundtable.selectedRound.id);

        this.updateMatchdayService
            .updateMatchday(this.roundtable.table.roundJson, this.roundtable.selectedGroup)
            .subscribe(
                (round: Rest.RoundAndTableJson) => {
                    this.roundtable.table = round;
                },
                (error) => {
                    this.modalService.open('AuthenticationWarningComponent', error.status);
                }
            );
    }

    updateOpenligaDb() {
        // console.info('Update with OpenligaDB round ' + this.roundtable.selectedRound.id);

       this.updateMatchdayService
           .updateByOpenligaDb(this.roundtable.table.roundJson.id, this.roundtable.selectedGroup.id)
           .subscribe(
               (round: Rest.RoundAndTableJson) => {
                   this.roundtable.table = round;
               },
               (error) => {
                   console.dir(error);
                   this.modalService.open('AuthenticationWarningComponent', error.status);
               }
           );
    }

    createOpenligaDb() {
        // console.info('Create with OpenligaDB.');

        this.updateMatchdayService
            .createOrUpdateByOpenligaDb(this.roundtable.table.roundJson.id, this.roundtable.selectedGroup.id)
            .subscribe(
                (round: Rest.RoundAndTableJson) => {
                    this.roundtable.table = round;
                    this.findRounds(
                        this.roundtable.seasonId, this.roundtable.selectedGroup.id
                    );
                },
                (error) => {
                    console.dir(error);
                    this.modalService.open('AuthenticationWarningComponent', error.status);
                }
            );
    }
}
