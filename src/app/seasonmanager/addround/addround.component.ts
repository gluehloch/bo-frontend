import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { SeasonService } from "src/app/season/season.service";

import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';

@Component({
    selector: 'app-add-round',
    templateUrl: './addround.component.html',
    styleUrls: ['./addround.component.css'],
    imports: [AuthenticationWarningComponent, FormsModule, SpinnerComponent],
    standalone: true,
})
export class AddRoundComponent implements OnInit {

    processing = signal(true);
    groupTypes = signal<Rest.GroupTypeJson[]>([]);
    season = signal<Rest.SeasonJson | null>(null);
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seasonService: SeasonService
    ) {
        
    }

    ngOnInit() {
        this.route.params
            .pipe(
                map(params => params['id']),
                switchMap(seasonId =>
                    forkJoin({
                        season: this.seasonService.findSeason(seasonId),
                        groups: this.seasonService.findGroups(seasonId)
                    })
                )
            )
            .subscribe({
                next: ({ season, groups }) => {
                    this.season.set(season);
                    this.groupTypes.set(groups);
                    this.processing.set(false);
                },
                error: error => {
                    console.error('Unable to execute request.', error);
                },
                complete: () => {
                    // Never complete, because the component is still active. But we can set processing to false, so that the spinner is hidden.
                    this.processing.set(false);
                },
            });
    }

}
