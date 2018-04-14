import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { USERROLE } from '../../user-role.enum';

import { UpdateMatchService } from './updatematch.service';
import { ModalService } from './../../modal/modal.service';


@Component({
    selector: 'app-match-detail',
    templateUrl: './updatematch.component.html',
    styleUrls: ['./updatematch.component.css']
})
export class UpdateMatchComponent implements OnInit {

    match: Rest.GameJson;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private updateMatchService: UpdateMatchService,
        private modalService: ModalService) {
    }

    ngOnInit() {
        this.route.params.map(params => params['id']).subscribe((matchId) => {
            this.findMatch(matchId);
        });
    }

    // ------------------------------------------------------------------------------

    private findMatch(matchId: number) {
        this.updateMatchService
            .findMatch(matchId)
            .subscribe(
                success => (match: Rest.GameJson) => {
                    this.match = match;
                },
                error => {
                    // TODO Error handling not implemented.
                    // this.modalService.open
                }
            );
    }

    updateMatch() {
        // console.info('Update round ' + this.roundtable.selectedRound.id);

        /*
        this.updateMatchdayService
            .updateMatchday(this.roundtable.table.roundJson, this.roundtable.selectedGroup)
            .subscribe(
                success => (round: Rest.RoundAndTableJson) => {
                    this.roundtable.table = round;
                },
                error => {
                    this.modalService.open('AuthenticationWarningComponent', error.status);
                }
            );
        */
    }

    resetMatch() {
        // NULL
    }

}
