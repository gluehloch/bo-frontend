import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { USERROLE } from '../../user-role.enum';

import { UpdateMatchService } from './updatematch.service';
import { ModalService } from './../../modal/modal.service';


@Component({
    selector: 'app-seasons',
    templateUrl: './updatematch.component.html',
    styleUrls: ['./updatematch.component.css']
})
export class UpdateMatchComponent implements OnInit {

    // roundtable: Roundtable;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private updateMatchService: UpdateMatchService,
        private modalService: ModalService) {

        // this.roundtable = new Roundtable();
    }

    ngOnInit() {
        /*
        this.route.params.map(params => params['id']).subscribe((seasonId) => {
            this.roundtable.seasonId = seasonId;
            console.log('Update a match day of season ' + this.roundtable.seasonId);
            this.findGroups(this.roundtable.seasonId);
        });
        */
    }

    // ------------------------------------------------------------------------------

    updateGame() {
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

    resetGame() {
        // NULL
    }

}
