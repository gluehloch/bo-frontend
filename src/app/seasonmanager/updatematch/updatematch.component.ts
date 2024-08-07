import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UpdateMatchService } from './updatematch.service';
import { ModalService } from './../../modal/modal.service';

import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Betoffice } from 'src/app/betoffice-json/model/betoffice-data-model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';

class MatchModel {
    seasonId: number;
    roundId: number;
    matchId: number;

    match: Rest.GameJson;

    // TODO Some common form disabling/submitting mechanism?
    submitted: boolean;

    constructor() {
        this.seasonId = -1;
        this.roundId = -1;
        this.matchId = -1;
        this.match = new Betoffice.GameModel();
        this.submitted = false;
    }
}

@Component({
    selector: 'app-match-detail',
    templateUrl: './updatematch.component.html',
    styleUrls: ['./updatematch.component.css'],
    standalone: true,
    imports: [AuthenticationWarningComponent, NgIf, FormsModule]
})
export class UpdateMatchComponent implements OnInit {

    dateTimeFormat = environment.dateTimeFormat;
    matchModel: MatchModel;
    localDateTime: string = '';
    processing = true;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private updateMatchService: UpdateMatchService,
        private modalService: ModalService) {

        this.matchModel = new MatchModel();

        // TODO: Remove me: Kann ich besser durch eine 'CanActivate' Guard implementiert werden.
        const id: Observable<string> = activatedRoute.params.pipe(map(p => p.id));
        const url: Observable<string> = activatedRoute.url.pipe(map(segments => segments.join('/')));
        // route.data includes both `data` and `resolve`
        const user = activatedRoute.data.pipe(map(d => d.user)); 
        

        url.subscribe(str => {
            console.log('URL', str);
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            console.log('params=', params, ', matchId=' + params.matchId + ' / roundId=' + params.roundId);
            this.matchModel.seasonId = params.seasonId;
            this.matchModel.roundId = params.roundId;
            this.matchModel.matchId = params.matchId;

            this.findMatch(params.matchId);
        });
    }

    // ------------------------------------------------------------------------------

    private findMatch(matchId: number) {
        console.log('Match loading: ' + matchId);
        this.processing = true;
        this.updateMatchService
            .findMatch(matchId)
            .subscribe(
                (match: Rest.GameJson) => {
                    console.dir('Match loaded.', match);
                    const dateTime = new Date(match.dateTime);
                    const month = (dateTime.getMonth() + 1 + '').padStart(2, '0');
                    const date = (dateTime.getDate() + '').padStart(2, '0');
                    const hours = (dateTime.getHours()  + '').padStart(2, '0');
                    const minutes = (dateTime.getMinutes()  + '').padStart(2, '0');

                    const x = dateTime.getFullYear()
                        + '-' + month
                        + '-' + date
                        + 'T' + hours
                        + ':' + minutes;

                    this.localDateTime = x;
                    this.matchModel.match = match;
                },
                (error) => {
                    console.error('Die Match-Daten konnten nicht vom Backend geladen werden.',  error);
                    // TODO Error handling not implemented.
                },
                () => {
                    this.processing = false;
                }
            );
    }

    updateMatch() {
        console.dir('Update match ' + this.matchModel.match);
        let gameDateTime = new Date(this.localDateTime);
        console.log('game datetime=', this.matchModel.match.dateTime, gameDateTime);

        const month = (gameDateTime.getMonth() + 1 + '').padStart(2, '0');
        const date = (gameDateTime.getDate() + '').padStart(2, '0');
        const hours = (gameDateTime.getHours()  + '').padStart(2, '0');
        const minutes = (gameDateTime.getMinutes()  + '').padStart(2, '0');

        const x = gameDateTime.getFullYear()
            + '-' + month
            + '-' + date
            + 'T' + hours
            + ':' + minutes
            + '+0200';
        console.log('best dateTime', x);
        this.matchModel.match.dateTime = x;

        // let formattedDateTime = gameDateTime.
        // .toZonedDateTime();
        this.updateMatchService
            .updateMatch(this.matchModel.match)
            .subscribe(
                (match: Rest.GameJson) => {
                    console.dir('Match reload.', match);
                    this.matchModel.match = match;
                },
                (error) => {
                    this.modalService.open('AuthenticationWarningComponent', error.status);
                    console.error('Die Match-Daten konnten nicht gespeichert werden.',  error);
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
                    console.error('Die Match-Daten konnten nicht vom Backend geladen werden.',  error);
                    // TODO Error handling not implemented.
                }
            );
    }

    backToRoundView() {
        this.router.navigate(['./chiefop/seasonmanager/updatematchday'],
            {queryParams: { seasonId: this.matchModel.seasonId, roundId: this.matchModel.roundId }});
    }

}
