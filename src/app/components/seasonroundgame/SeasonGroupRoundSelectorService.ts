import { Sorting } from "../../betoffice-json/model/Sorting";
import { SeasonService } from "../../season/season.service";

import { RoundtableModel } from "./RoundtableModel";

export type Processing = {
    start(): void;
    stop(): void;
}

export type GamesPreprocessor = {
    initGames(games: Rest.GameJson[]): void;
}

export class SeasonGroupRoundSelectorService {

    constructor(
        private processing: Processing,
        private seasonService: SeasonService,
        private roundtable: RoundtableModel,
        private gamesPreprocessor: GamesPreprocessor) {
    }

    findSeasons() {
        this.processing.start();
        this.seasonService.findSeasons()
                        .subscribe((seasons: Rest.SeasonJson[]) => {
            const sortedSeason = seasons.sort(Sorting.compareSeason);
            this.copy(sortedSeason, this.roundtable.seasons);
            this.roundtable.selectedSeason = seasons[0];
            this.findGroups(this.roundtable.selectedSeason.id);
            this.processing.stop();
        });
    }

    seasonSelected(selectedSeasonId: number) {
        const selectedSeason = this.roundtable
                                   .seasons
                                   .find(season => season.id == selectedSeasonId);
        this.roundtable.selectedSeason = selectedSeason;
        this.findGroups(selectedSeasonId);
    }

    findGroups(seasonId: number) {
        this.processing.start();
        this.seasonService.findGroups(seasonId)
                        .subscribe((groups: Rest.GroupTypeJson[]) => {
            this.copy(groups, this.roundtable.groups);
            if (this.roundtable.groups.length > 0 && this.roundtable.selectedSeason) {
                this.roundtable.selectedGroup = groups[0];
                this.findRounds(this.roundtable.selectedSeason.id, this.roundtable.selectedGroup.id);
            }
            this.processing.stop();
        });
    }

    groupSelected(selectedGroupId: number) {
        const selectedGroup = this.roundtable
                                  .groups
                                  .find(group => group.id == selectedGroupId);
        this.roundtable.selectedGroup = selectedGroup;
        if (this.roundtable.selectedSeason) {
            this.findRounds(this.roundtable.selectedSeason.id, selectedGroupId);
        }
    }

    findRounds(seasonId: number, groupId: number) {
        this.processing.start();
        this.seasonService.findRounds(seasonId, groupId)
                        .subscribe((season: Rest.SeasonJson) => {
            this.copy(season.rounds, this.roundtable.rounds);
            if (season.rounds != null && season.rounds.length > 0) {
                const now = new Date();
                let possibleSelectedRound = null;
                season.rounds.forEach(round => {
                    const roundDate = new Date(round.dateTime);
                    if (roundDate < now) {
                        possibleSelectedRound = round;
                    }
                });

                if (possibleSelectedRound != null) {
                    this.roundtable.selectedRound = possibleSelectedRound;
                } else {
                    this.roundtable.selectedRound = season.rounds[0];
                }

                if (this.roundtable.selectedRound && this.roundtable.selectedGroup) {
                    this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
                } else {
                    this.roundtable.table = undefined;
                }
            } else {
                this.roundtable.table = undefined;
            }
            this.processing.stop();
        });
    }

    roundSelected(selectedRoundId: number) {
        const selectedRound = this.roundtable
                                  .rounds
                                  .find(round => round.id == selectedRoundId);

        this.roundtable.selectedRound = selectedRound;
        if (this.roundtable.selectedRound && this.roundtable.selectedGroup) {
            this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
        }
    }

    findRoundAndTable(roundId: number, groupId: number) {
        this.processing.start();
        this.seasonService.findRound(roundId, groupId)
                        .subscribe((round: Rest.RoundAndTableJson) => {
            this.roundtable.table = round;
            const games = this.sortGames(this.roundtable.table.roundJson.games);
            this.roundtable.table.roundJson.games = games;
            this.initGames(games);
            this.processing.stop();
        });
    }

    private copy<T>(source: T[], target: T[]): T[] {
        target.splice(0);
        source.forEach(el => target.push(el));
        return target;
    }

    private sortGames(games: Rest.GameJson[]): Rest.GameJson[] {
        return games.sort((g1, g2) => {
            const date1 = new Date(g1.dateTime);
            const date2 = new Date(g2.dateTime);
            return date1.getTime() - date2.getTime();
        });
    }

    private initGames(games: Rest.GameJson[]): void {
        this.gamesPreprocessor.initGames(games);    }

}
