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
        // this.route.paramMap.forEach
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
                }
            );
    }

    backToRoundView() {
        // Leider kenne ich hier die Season ID nicht.
        this.router.navigate(['./chiefop/seasonmanager/updatematchday', 'TODO: seasonId']);
    }

}
