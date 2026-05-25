import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import {
    CreateMatchdayModel,
    CreateMatchdayGameModel,
    CreateMatchdayGamePayload,
    CreateMatchdayRoundPayload
} from './create-matchday-model';
import { CreateMatchdayService } from './creatematchday.service';
import { Sorting } from '../../betoffice-json/model/Sorting';
import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-matchday',
    templateUrl: './creatematchday.component.html',
    styleUrls: ['./creatematchday.component.css'],
    imports: [AuthenticationWarningComponent, FormsModule],
    standalone: true,
})
export class CreateMatchdayComponent implements OnInit {

    model = new CreateMatchdayModel();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private createMatchdayService: CreateMatchdayService,
    ) {
    }

    ngOnInit(): void {
        this.loadSeasons();
    }

    private loadSeasons(): void {
        this.model.processing = true;
        this.createMatchdayService.findSeasons().subscribe({
            next: seasons => {
                this.model.seasons = seasons.sort(Sorting.compareSeason);
                const seasonIdParam = this.route.snapshot.queryParamMap.get('seasonId');
                const seasonFromParam = seasonIdParam ? this.model.seasons.find(s => s.id === parseInt(seasonIdParam, 10)) : undefined;
                this.model.selectedSeason = seasonFromParam ? seasonFromParam : this.model.seasons[0];
                if (this.model.selectedSeason) {
                    this.loadSeasonConfiguration(this.model.selectedSeason.id);
                }
            },
            error: error => {
                console.error(error);
                this.model.errorMessage = 'Die Meisterschaften konnten nicht geladen werden.';
                this.model.processing = false;
            }
        });
    }

    seasonSelected(event: Event): void {
        const selectedSeasonId = parseInt((event.target as HTMLSelectElement).value, 10);
        const selectedSeason = this.model.seasons.find(season => season.id === selectedSeasonId);
        this.model.selectedSeason = selectedSeason;
        this.model.selectedGroup = undefined;
        this.model.games = [];
        this.model.roundDateTime = '';
        this.model.successMessage = '';
        this.model.errorMessage = '';
        this.loadSeasonConfiguration(selectedSeasonId);
    }

    private loadSeasonConfiguration(seasonId: number): void {
        this.model.processing = true;
        const findSeason = this.createMatchdayService.findSeason(seasonId);
        const findGroups = this.createMatchdayService.findGroupsBySeason(seasonId);
        const findSeasonGroupTeams = this.createMatchdayService.findSeasonGroupTeams(seasonId);

        forkJoin([findSeason, findGroups, findSeasonGroupTeams]).subscribe({
            next: result => {
                const season = result[0];
                const groups = result[1];
                const seasonGroupTeam = result[2];
                this.model.selectedSeason = season;
                this.model.groups = groups;
                this.model.seasonGroupTeam = seasonGroupTeam;
                this.model.selectedGroup = groups.length > 0 ? groups[0] : undefined;
                this.addGame();
            },
            error: error => {
                console.error(error);
                this.model.errorMessage = 'Die Saisondaten konnten nicht geladen werden.';
            },
            complete: () => {
                this.model.processing = false;
            }
        });
    }

    addGame(): void {
        const groupId = this.model.selectedGroup ? this.model.selectedGroup.id : undefined;
        this.model.games.push({
            groupId: groupId,
            dateTime: this.model.roundDateTime,
        });
    }

    removeGame(index: number): void {
        this.model.games.splice(index, 1);
    }

    groupSelected(event: Event): void {
        const selectedGroupId = parseInt((event.target as HTMLSelectElement).value, 10);
        const selectedGroup = this.model.groups.find(group => group.id === selectedGroupId);
        this.model.selectedGroup = selectedGroup;
    }

    gameGroupSelected(game: CreateMatchdayGameModel, event: Event): void {
        const selectedGroupId = parseInt((event.target as HTMLSelectElement).value, 10);
        game.groupId = selectedGroupId;
        game.homeTeamId = undefined;
        game.guestTeamId = undefined;
    }

    findTeamsByGroupId(groupId?: number): Rest.TeamJson[] {
        if (!this.model.seasonGroupTeam || groupId === undefined) {
            return [];
        }

        const groupTeam = this.model.seasonGroupTeam.groupTeams.find(g => g.groupType.id === groupId);
        return groupTeam ? groupTeam.teams : [];
    }

    canSubmit(): boolean {
        if (this.model.submitted) {
            return false;
        }
        if (!this.model.selectedSeason || !this.model.selectedGroup || !this.model.roundDateTime) {
            return false;
        }
        if (this.model.games.length === 0) {
            return false;
        }

        for (const game of this.model.games) {
            if (!game.groupId || !game.dateTime || !game.homeTeamId || !game.guestTeamId) {
                return false;
            }
            if (game.homeTeamId === game.guestTeamId) {
                return false;
            }
        }

        return true;
    }

    createMatchday(): void {
        if (!this.canSubmit() || !this.model.selectedSeason || !this.model.selectedGroup) {
            return;
        }

        this.model.submitted = true;
        this.model.errorMessage = '';
        this.model.successMessage = '';

        let roundPayload: CreateMatchdayRoundPayload;
        try {
            roundPayload = this.createRoundPayload(this.model.selectedSeason, this.model.selectedGroup);
        } catch (error) {
            console.error(error);
            this.model.errorMessage = error instanceof Error ? error.message : 'Der Spieltag konnte nicht angelegt werden.';
            this.model.submitted = false;
            return;
        }

        this.createMatchdayService
            .createMatchday(this.model.selectedSeason.id, this.model.selectedGroup.id, roundPayload)
            .subscribe({
                next: result => {
                    this.model.successMessage = 'Der Spieltag wurde erfolgreich angelegt.';
                    this.router.navigate(['./chiefop/seasonmanager/updatematchday'], {
                        queryParams: {
                            seasonId: this.model.selectedSeason?.id,
                            roundId: result.roundJson.id
                        }
                    });
                },
                error: error => {
                    console.error(error);
                    this.model.errorMessage = 'Der Spieltag konnte nicht angelegt werden.';
                    this.model.submitted = false;
                },
            });
    }

    abort(): void {
        this.router.navigate(['./chiefop/seasonmanager']);
    }

    private createRoundPayload(season: Rest.SeasonJson, selectedGroup: Rest.GroupTypeJson): CreateMatchdayRoundPayload {
        const games = this.model.games.map((game, index) => {
            const group = this.model.groups.find(g => g.id === game.groupId) || selectedGroup;
            const teams = this.findTeamsByGroupId(group.id);
            const homeTeam = teams.find(team => team.id === game.homeTeamId);
            const guestTeam = teams.find(team => team.id === game.guestTeamId);

            if (!homeTeam) {
                throw new Error(`Heimteam mit ID ${game.homeTeamId} konnte nicht zugeordnet werden.`);
            }
            if (!guestTeam) {
                throw new Error(`Gastteam mit ID ${game.guestTeamId} konnte nicht zugeordnet werden.`);
            }

            return {
                id: 0,
                openligaid: 0,
                index: index + 1,
                roundId: 0,
                dateTime: this.formatDateTimeForBackend(game.dateTime),
                homeTeam: homeTeam,
                guestTeam: guestTeam,
                groupType: group,
                halfTimeResult: {
                    homeGoals: 0,
                    guestGoals: 0
                },
                result: {
                    homeGoals: 0,
                    guestGoals: 0
                },
                overtimeResult: {
                    homeGoals: 0,
                    guestGoals: 0
                },
                penaltyResult: {
                    homeGoals: 0,
                    guestGoals: 0
                },
                finished: false,
                ko: false,
                tipps: []
            };
        });

        const roundDate = this.formatDateTimeForBackend(this.model.roundDateTime);
        const nextIndex = (season.rounds?.length || 0) + 1;

        return {
            id: 0,
            seasonId: season.id,
            seasonName: season.name,
            seasonYear: season.year,
            dateTime: roundDate,
            index: nextIndex,
            lastRound: false,
            tippable: false,
            games: games
        };
    }

    private formatDateTimeForBackend(localDateTime: string): string {
        const date = new Date(localDateTime);
        const offsetMinutes = -date.getTimezoneOffset();
        const offsetSign = offsetMinutes >= 0 ? '+' : '-';
        const offsetAbs = Math.abs(offsetMinutes);
        const offsetHours = Math.floor(offsetAbs / 60).toString().padStart(2, '0');
        const offsetMins = (offsetAbs % 60).toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}${offsetSign}${offsetHours}${offsetMins}`;
    }
}
