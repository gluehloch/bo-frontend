import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

import { SeasonManagerUpdateService } from './seasonmanagerupdate.service';
import { UpdateSeasonModel } from './update-season-model';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-season-manager-update',
    templateUrl: './seasonmanagerupdate.component.html',
    styleUrls: ['./seasonmanagerupdate.component.css']
})
export class SeasonManagerUpdateComponent implements OnInit {

    model = new UpdateSeasonModel();
    processing = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seasonManagerUpdateService: SeasonManagerUpdateService
    ) {
        this.model.submitted = false;
    }

    ngOnInit() {
        this.startProcessing();
        this.route.params.pipe(map(params => params['id'])).subscribe((seasonId) => {
            const findSeason = this.seasonManagerUpdateService.findSeason(seasonId);
            const findGroupTypes = this.seasonManagerUpdateService.findGroupTypes();
            const findSeasonGroupTypes = this.seasonManagerUpdateService.findGroupTypesBySeason(seasonId);

            forkJoin([findSeason, findGroupTypes, findSeasonGroupTypes]).subscribe({
                next: results => {
                    this.model.season = results[0];
                    this.model.selectableGroupTypes = results[1];
                    this.model.groupTypes = results[2];

                    this.model.selectableGroupTypes = this.model.selectableGroupTypes
                        .filter(i => (this.model.groupTypes.find(j => j.id === i.id)) === undefined);
                },
                error: error => {
                    console.error('Unable to execute request.', error);
                },
                complete: () => {
                    this.completeProcessing();
                }
            });
        });
    }

    updateSeason() {
        this.startProcessing();
        this.seasonManagerUpdateService.updateSeason(this.model.season).subscribe({
            next: (season: Rest.SeasonJson) => {
                this.model.season = season;
                this.navigateToOverview();
            },
            error: error => {
                console.error('Unable to update season.', error);
            },
            complete: () => {
                this.completeProcessing();
            }
        });
    }

    abort() {
        this.navigateToOverview();
    }

    private navigateToOverview(): void {
        this.router.navigate(['./chiefop/seasonmanager']);
    }

    private startProcessing(): void {
        this.processing = true;
    }

    private completeProcessing(): void {
        this.processing = false;
    }

}
