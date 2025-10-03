import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

import { SeasonManagerUpdateService } from './seasonmanagerupdate.service';
import { UpdateSeasonModel } from './update-season-model';

import { FormsModule } from '@angular/forms';
import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';

@Component({
    selector: 'app-season-manager-update',
    templateUrl: './seasonmanagerupdate.component.html',
    styleUrls: ['./seasonmanagerupdate.component.css'],
    standalone: true,
    imports: [AuthenticationWarningComponent, FormsModule]
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

            findSeason.subscribe({
                next: seasonJson => {
                    this.model.season = seasonJson;
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
            next: seasonJson => {
                this.model.season = seasonJson;
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
