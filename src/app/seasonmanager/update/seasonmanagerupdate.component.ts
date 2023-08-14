import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

import { SeasonManagerUpdateService } from './seasonmanagerupdate.service';
import { UpdateSeasonModel } from './update-season-model';

@Component({
    selector: 'app-season-manager-update',
    templateUrl: './seasonmanagerupdate.component.html',
    styleUrls: ['./seasonmanagerupdate.component.css']
})
export class SeasonManagerUpdateComponent implements OnInit {

    model = new UpdateSeasonModel();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seasonManagerUpdateService: SeasonManagerUpdateService
    ) {
        this.model.submitted = false;
    }

    ngOnInit() {
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.seasonManagerUpdateService.findSeason(id).subscribe(
                (season: Rest.SeasonJson) => {
                    this.model.season = season;
                    //this.model.season.name = season.name;
                });
        });
    }

    updateSeason() {
        this.seasonManagerUpdateService.updateSeason(this.model.season).subscribe(
            (season: Rest.SeasonJson) => {
                this.model.season = season;
                this.navigateToOverview();
            });
    }

    abort() {
        this.navigateToOverview();
    }

    private navigateToOverview(): void {
        this.router.navigate(['./chiefop/seasonmanager']);
    }

}
