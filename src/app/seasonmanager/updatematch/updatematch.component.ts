import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { USERROLE } from '../../user-role.enum';

import { UpdateMatchService } from './updatematch.service';
import { ModalService } from './../../modal/modal.service';
import { ResponseType } from '@angular/http';

class MatchModel {
    match: Rest.GameJson;

    // TODO Some common form disabling/submitting mechanism?
    submitted: false;
}

@Component({
    selector: 'app-match-detail',
    templateUrl: './updatematch.component.html',
    styleUrls: ['./updatematch.component.css']
})
export class UpdateMatchComponent implements OnInit {

    matchModel: MatchModel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private updateMatchService: UpdateMatchService,
        private modalService: ModalService) {

        this.matchModel = new MatchModel();
        this.matchModel.match = null;
    }

    ngOnInit() {
        this.route.params.map(params => params['id']).subscribe((matchId) => {
            this.findMatch(matchId);
        });
    }

    // ------------------------------------------------------------------------------

    private findMatch(matchId: number) {
        console.log('Match loading: ' + matchId);
        this.updateMatchService
            .findMatch(matchId)
            .subscribe(
                (match: Rest.GameJson) => {
                    console.log('Match loaded: ' + match);
                    this.matchModel.match = match;
                },
                (error) => {
                    console.error('Ein Fehler: ' + error);
                    console.dir(error);
                    // TODO Error handling not implemented.
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
