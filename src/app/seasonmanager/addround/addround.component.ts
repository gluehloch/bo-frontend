import { DatePipe } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { finalize, map, switchMap } from "rxjs/operators";

import { SeasonService } from "src/app/season/season.service";

import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';

@Component({
    selector: 'app-add-round',
    templateUrl: './addround.component.html',
    styleUrls: ['./addround.component.css'],
    imports: [AuthenticationWarningComponent, DatePipe, FormsModule, SpinnerComponent],
    standalone: true,
})
export class AddRoundComponent implements OnInit {

    processing = signal(true);
    updatingRound = signal(false);
    groupTypes = signal<Rest.GroupTypeJson[]>([]);
    season = signal<Rest.SeasonJson | null>(null);

    editingRoundId: number | null = null;
    editingRoundDateTime = '';
    editingRoundGroupType: Rest.GroupTypeJson | null = null;

    newRoundDateTime = '';
    newRoundGroupType: Rest.GroupTypeJson | null = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seasonService: SeasonService
    ) {

    }

    ngOnInit(): void {
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

    findRoundAndGroups(seasonId: number, roundId: number): void {
        forkJoin({
            season: this.seasonService.findSeason(seasonId),
            groups: this.seasonService.findGroups(seasonId)
        }).subscribe({
            next: ({ season, groups }) => {
                this.season.set(season);
                this.groupTypes.set(groups);
            }
        });
    }

    startEdit(season: Rest.SeasonJson | null, round: Rest.RoundJson): void {
        this.editingRoundId = round.id;
        this.editingRoundDateTime = this.toLocalDateTimeValue(round.dateTime);
        this.editingRoundGroupType = this.groupTypes().find(groupType => groupType.id === round.groupType?.id)
            ?? round.groupType
            ?? null;
    }

    updateRound(season: Rest.SeasonJson | null, round: Rest.RoundJson): void {
        if (!season) {
            return;
        }

        if (this.editingRoundId === round.id) {
            this.saveRound(season);
            return;
        }
    }

    addRound(season: Rest.SeasonJson | null): void {
        const s = this.season();
        if (!season) {
            return;
        }

        if (!this.newRoundGroupType) {
            return;
        }

        //this.saveRound
    }

    cancelRoundEdit(): void {
        this.editingRoundId = null;
        this.editingRoundDateTime = '';
        this.editingRoundGroupType = null;

        const seasonId = this.season()?.id;
        if (seasonId) {
            this.processing.set(true);
            forkJoin({
                season: this.seasonService.findSeason(seasonId),
                groups: this.seasonService.findGroups(seasonId)
            }).subscribe({
                next: ({ season, groups }) => {
                    this.season.set(season);
                    this.groupTypes.set(groups);
                    this.processing.set(false);
                },
                error: error => {
                    console.error('Unable to execute request.', error);
                },
                complete: () => {
                    this.processing.set(false);
                },
            });
        }
    }

    isEditingRound(round: Rest.RoundJson): boolean {
        return this.editingRoundId === round.id;
    }

    private saveRound(season: Rest.SeasonJson): void {
        if (!this.editingRoundGroupType || this.editingRoundId === null) {
            return;
        }

        const selectedGroupType = this.editingRoundGroupType;

        const currentSeason = this.season();
        const round = currentSeason?.rounds.find(entry => entry.id === this.editingRoundId);
        if (!round) {
            return;
        }

        const updatedRound: Rest.UpdateRoundJson = {
            seasonId: season.id,
            roundId: round.id,
            dateTime: this.toBackendDateTime(this.editingRoundDateTime) as unknown as Date,
            groupType: selectedGroupType.type,
        };

        this.updatingRound.set(true);
        this.seasonService.updateRound(season.id, round.id, updatedRound)
            // .pipe(finalize(() => this.updatingRound.set(false)))
            .subscribe({
                next: () => {
                    this.cancelRoundEdit();
                },
                error: error => {
                    console.error('Unable to update round.', error);
                },
                complete: () => {
                    this.updatingRound.set(false);
                }
            });
    }

    private toLocalDateTimeValue(dateTime: Date | string | undefined): string {
        const value = dateTime ? new Date(dateTime) : new Date();
        const month = (value.getMonth() + 1 + '').padStart(2, '0');
        const day = (value.getDate() + '').padStart(2, '0');
        const hours = (value.getHours() + '').padStart(2, '0');
        const minutes = (value.getMinutes() + '').padStart(2, '0');

        return value.getFullYear()
            + '-'
            + month
            + '-'
            + day
            + 'T'
            + hours
            + ':'
            + minutes;
    }

    private toBackendDateTime(localDateTime: string): string {
        return localDateTime + '+0200';
    }

}
