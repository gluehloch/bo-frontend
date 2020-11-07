import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { USERROLE } from '../../user-role.enum';

import { UpdateMatchService } from './updatematch.service';
import { ModalService } from './../../modal/modal.service';

import { environment } from './../../../environments/environment';

class MatchModel {
    seasonId: number;
    roundId: number;
    matchId: number;

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

    dateTimeFormat = environment.dateTimeFormat;
    matchModel: MatchModel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private updateMatchService: UpdateMatchService,
        private modalService: ModalService) {

        this.matchModel = new MatchModel();
        this.matchModel.match = null;
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            console.log('matchId=' + params.matchId + ' / roundId=' + params.roundId);
            this.matchModel.seasonId = params.seasonId;
            this.matchModel.roundId = params.roundId;
            this.matchModel.matchId = params.matchId;

            this.findMatch(params.matchId);
        });
    }

    // ------------------------------------------------------------------------------

    private findMatch(matchId: number) {
        console.log('Match loading: ' + matchId);
        this.updateMatchService
            .findMatch(matchId)
            .subscribe(
                (match: Rest.GameJson) => {
                    console.dir('Match loaded.', match);
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
        console.dir('Update match ' + this.matchModel.match);
        this.updateMatchService
            .updateMatch(this.matchModel.match)
            .subscribe(
                (match: Rest.GameJson) => {
                    console.dir('Match reload.', match);
                    this.matchModel.match = match;
                },
                (error) => {
                    this.modalService.open('AuthenticationWarningComponent', error.status);
                    console.error('Ein Fehler: ' + error);
                    console.dir(error);
                    // TODO Error handling not implemented.
                }
            );
    }

    resetMatch() {
        this.updateMatchService
            .findMatch(this.matchModel.match.id)
            .subscribe(
                (match: Rest.GameJson) => {
                    this.matchModel.match = match;
                },
                (error) => {
                    console.error('Ein Fehler', error);
                    console.dir(error);
                    // TODO Error handling not implemented.
                }
            );
    }

    backToRoundView() {
        this.router.navigate(['./chiefop/seasonmanager/updatematchday'],
            {queryParams: { seasonId: this.matchModel.seasonId, roundId: this.matchModel.roundId }});
    }

}
