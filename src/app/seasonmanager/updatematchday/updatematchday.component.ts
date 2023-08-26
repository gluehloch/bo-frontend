import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UpdateMatchdayService } from './updatematchday.service';
import { ModalService } from './../../modal/modal.service';

import { environment } from './../../../environments/environment';
import { Betoffice } from 'src/app/betoffice-json/model/betoffoce-data-model';

export class Roundtable {
    seasonId: number;
    roundId: number;
    groups: Betoffice.GroupTypeModel[];
    selectedGroup?: Betoffice.GroupTypeModel;
    rounds: Betoffice.RoundModel[];
    selectedRound?: Betoffice.RoundModel;
    table: Betoffice.RoundAndTableModel;

    constructor() {
        this.seasonId = -1;
        this.roundId = -1;
        this.groups = [];
        this.rounds = [];
        this.table = new Betoffice.RoundAndTableModel();
    }
};

@Component({
    selector: 'app-seasons',
    templateUrl: './updatematchday.component.html',
    styleUrls: ['./updatematchday.component.css']
})
export class UpdateMatchdayComponent implements OnInit {

    dateTimeFormat = environment.dateTimeFormat;
    roundtable: Roundtable;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private updateMatchdayService: UpdateMatchdayService,
        private modalService: ModalService) {

        this.roundtable = new Roundtable();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.roundtable.seasonId = params['seasonId'];
            this.roundtable.roundId = params['roundId'];
            console.log('Update matchday: seasonId=' + this.roundtable.seasonId + ', roundId=' + this.roundtable.roundId);
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
        this.updateMatchdayService.findRounds(seasonId, groupId).subscribe((season: Rest.SeasonJson) => {
            this.roundtable.rounds = season.rounds;

            const selectRoundId = this.roundtable.roundId ? this.roundtable.roundId : season.currentRoundId;

            if (selectRoundId) {
                const index = _.findIndex(this.roundtable.rounds, e => { return e.id == selectRoundId });
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

            if (this.roundtable.selectedGroup) {
                this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
            } else {
                console.info('Es fehlt eine ausgewählte Gruppe zum Abruf der Rundendaten.');
            }
        });
    }

    private findRoundAndTable(roundId: number, groupId: number) {
        this.updateMatchdayService.findRound(roundId, groupId)
            .subscribe((round: Rest.RoundAndTableJson) => {
                this.roundtable.table = round;
            });
    }

    // ------------------------------------------------------------------------------

    groupSelected(event: any) {
        // console.info('Selected group id: ' + event.target.value);

        const selectedGroupId = event.target.value;
        const selectedGroup = this.roundtable.groups.find(group => group.id === parseInt(selectedGroupId, 10));
        if (selectedGroup) {
            this.roundtable.selectedGroup = selectedGroup;
            this.findRounds(this.roundtable.seasonId, selectedGroupId);
        }
    }

    roundSelected(event: any) {
        if (this.roundtable.selectedGroup) {
            const selectedRoundId = event.target.value;
            const selectedRound = this.roundtable.rounds.find(round => round.id === parseInt(selectedRoundId, 10));
            if (selectedRound) {
                this.roundtable.selectedRound = selectedRound;
                this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
            }
        }
    }

    updateMatch(game: Rest.GameJson) {
        if (this.roundtable.selectedRound) {
            this.router.navigate(['./chiefop/seasonmanager/updatematch'],
                { queryParams: {seasonId: this.roundtable.seasonId, roundId: this.roundtable.selectedRound.id, matchId: game.id}});
        }
    }

    updateMatchDay() {
        if (this.roundtable.selectedGroup) {
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
    }

    updateOpenligaDb() {
        if (this.roundtable.selectedGroup) {
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
    }

    createOpenligaDb() {
        if (this.roundtable.selectedGroup) {
            const selectedGroup = this.roundtable.selectedGroup;
            this.updateMatchdayService
                .createOrUpdateByOpenligaDb(this.roundtable.table.roundJson.id, selectedGroup.id)
                .subscribe(
                    (round: Rest.RoundAndTableJson) => {
                        this.roundtable.table = round;
                        this.findRounds(
                            this.roundtable.seasonId, selectedGroup.id
                        );
                    },
                    (error) => {
                        console.dir(error);
                        this.modalService.open('AuthenticationWarningComponent', error.status);
                    }
                );
        }
    }
}
