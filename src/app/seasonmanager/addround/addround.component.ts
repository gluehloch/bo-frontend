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

    updateRound(season: Rest.SeasonJson | null, round: Rest.RoundJson): void {
        if (!season) {
            return;
        }

        if (this.editingRoundId === round.id) {
            this.saveRound(season);
            return;
        }

        this.editingRoundId = round.id;
        this.editingRoundDateTime = this.toLocalDateTimeValue(round.dateTime);
        this.editingRoundGroupType = this.groupTypes().find(groupType => groupType.id === round.groupType?.id)
            ?? round.groupType
            ?? null;
    }

    cancelRoundEdit(): void {
        this.editingRoundId = null;
        this.editingRoundDateTime = '';
        this.editingRoundGroupType = null;
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

        const updatedRound: Rest.RoundJson = {
            ...round,
            dateTime: this.toBackendDateTime(this.editingRoundDateTime) as unknown as Date,
            groupType: selectedGroupType,
        };

        this.updatingRound.set(true);
        this.seasonService.updateRound(season.id, updatedRound, selectedGroupType)
            .pipe(finalize(() => this.updatingRound.set(false)))
            .subscribe({
                next: (response) => {
                    const savedRound = response.roundJson ?? updatedRound;
                    this.season.update(existingSeason => {
                        if (!existingSeason) {
                            return existingSeason;
                        }

                        return {
                            ...existingSeason,
                            rounds: existingSeason.rounds.map(entry =>
                                entry.id === savedRound.id
                                    ? { ...entry, ...savedRound, groupType: savedRound.groupType ?? selectedGroupType }
                                    : entry,
                            ),
                        };
                    });
                    this.cancelRoundEdit();
                },
                error: error => {
                    console.error('Unable to update round.', error);
                },
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
