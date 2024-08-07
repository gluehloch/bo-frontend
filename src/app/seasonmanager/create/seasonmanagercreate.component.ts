import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerCreateService } from './seasonmanagercreate.service';
import { CreateSeasonModel } from './create-season-model';

import { SeasonType, TeamType } from '../../betoffice-json/betofficetype';

import { environment } from '../../../environments/environment';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-season-manager-create',
    templateUrl: './seasonmanagercreate.component.html',
    styleUrls: ['./seasonmanagercreate.component.css'],
    standalone: true,
    imports: [FormsModule, NgFor]
})

export class SeasonManagerCreateComponent implements OnInit {

    model = new CreateSeasonModel();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seasonManagerCreateService: SeasonManagerCreateService
    ) {
    }

    ngOnInit() {
    }

    createSeason() {
        this.model.submitted = true;
        this.seasonManagerCreateService.createSeason(this.model.season).subscribe(
            (storedSeason: Rest.SeasonJson) => {
                this.model.season = storedSeason;
                this.router.navigate(['./chiefop/seasonmanager']);
            },
            error => {
                console.error(error);
            }
        );
    }    

    abort() {
        this.router.navigate(['./chiefop/seasonmanager']);
    }

}
