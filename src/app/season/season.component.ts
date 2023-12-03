import { Component, OnInit } from '@angular/core';

import { SeasonService } from './season.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from './../../environments/environment';
import { Betoffice } from '../betoffice-json/model/betoffoce-data-model';
import { Sorting } from '../betoffice-json/model/Sorting';

export class Roundtable {
    seasons: Rest.SeasonJson[];
    selectedSeason: Rest.SeasonJson | undefined;
    groups: Rest.GroupTypeJson[];
    selectedGroup: Rest.GroupTypeJson | undefined;
    rounds: Rest.RoundJson[];
    selectedRound: Rest.RoundJson | undefined;
    table: Rest.RoundAndTableJson | undefined;

    constructor() {
        this.seasons = [];
        this.selectedSeason = undefined;
        this.groups = [];
        this.selectedGroup = undefined;
        this.rounds = [];
        this.selectedRound = undefined;
        this.table = new Betoffice.RoundAndTableModel();
    }
};

class ExpandedGameDetail {
    expanded = false;
    detail: Rest.GameDetailsJson | undefined;
    game: Rest.GameJson | undefined;
}

@Component({
    selector: 'app-seasons',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

    dateTimeFormat = environment.dateTimeFormat;
    roundtable: Roundtable;
    expandedGames: Map<number, ExpandedGameDetail> = new Map<number, ExpandedGameDetail>();

    constructor(private seasonService: SeasonService, private navigationRouterService: NavigationRouterService) {
        this.roundtable = new Roundtable();
    }

    ngOnInit() {
        this.findSeasons();
    }

    private sortGames(games: Rest.GameJson[]): Rest.GameJson[] {
        return games.sort((g1, g2) => {
            const date1 = new Date(g1.dateTime);
            const date2 = new Date(g2.dateTime);
            return date1.getTime() - date2.getTime();
        });
    }

    findSeasons() {
        this.seasonService.findSeasons()
                          .subscribe((seasons: Rest.SeasonJson[]) => {
            this.navigationRouterService.activate(NavigationRouterService.ROUTE_MEISTERSCHAFTEN);
            const sortedSeason = seasons.sort(Sorting.compareSeason);
            this.copy(sortedSeason, this.roundtable.seasons);
            this.roundtable.selectedSeason = seasons[0];
            this.findGroups(this.roundtable.selectedSeason.id);
        });
    }

    findGroups(seasonId: number) {
        this.seasonService.findGroups(seasonId)
                          .subscribe((groups: Rest.GroupTypeJson[]) => {
            this.copy(groups, this.roundtable.groups);
            if (this.roundtable.groups.length > 0 && this.roundtable.selectedSeason) {
                this.roundtable.selectedGroup = groups[0];
                this.findRounds(this.roundtable.selectedSeason.id, this.roundtable.selectedGroup.id);
            }
        });
    }

    findRounds(seasonId: number, groupId: number) {
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
        });
    }

    findRoundAndTable(roundId: number, groupId: number) {
        this.seasonService.findRound(roundId, groupId)
                          .subscribe((round: Rest.RoundAndTableJson) => {
            this.roundtable.table = round;
            const games = this.sortGames(this.roundtable.table.roundJson.games);
            this.roundtable.table.roundJson.games = games;
            this.initGames(games);
        });
    }

    seasonSelected(event: any) {
        console.debug('Selected season id: ' + event.target.value);

        const selectedSeasonId = event.target.value;
        const selectedSeason = this.roundtable
                                   .seasons
                                   .find(season => season.id == selectedSeasonId);
        this.roundtable.selectedSeason = selectedSeason;
        this.findGroups(selectedSeasonId);
    }

    groupSelected(event: any) {
        console.debug('Selected group id: ' + event.target.value);

        const selectedGroupId = event.target.value;
        const selectedGroup = this.roundtable
                                  .groups
                                  .find(group => group.id == selectedGroupId);
        this.roundtable.selectedGroup = selectedGroup;
        if (this.roundtable.selectedSeason) {
            this.findRounds(this.roundtable.selectedSeason.id, selectedGroupId);
        }
    }

    roundSelected(event: any) {
        console.debug('Selected round id: ', event.target.value);

        const selectedRound = this.roundtable
                                  .rounds
                                  .find(round => round.id == event.target.value);

        this.roundtable.selectedRound = selectedRound;
        if (this.roundtable.selectedRound && this.roundtable.selectedGroup) {
            this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
        }
    }

    private initGames(games: Rest.GameJson[]): void {
        this.expandedGames.clear();
        for (const game of games) {
            const expandedGameDetail = new ExpandedGameDetail();
            expandedGameDetail.expanded = false;
            expandedGameDetail.detail = undefined;
            expandedGameDetail.game = game;
            this.expandedGames.set(game.id, expandedGameDetail);
        }        
    }

    onClickDetails(game: Rest.GameJson): void {
        const expandedGameDetail = this.expandedGames.get(game.id);
        if (expandedGameDetail === undefined) {
            console.error('No expanded game detail found for game: ', game);
            return;
        }
        expandedGameDetail.expanded = !expandedGameDetail.expanded;

        if (expandedGameDetail.expanded && expandedGameDetail.detail === undefined) {
            this.seasonService.findGameDetails(game.id)
                              .subscribe((gameDetails: Rest.GameDetailsJson) => {
                const expandedGameDetail = new ExpandedGameDetail()
                expandedGameDetail.detail = gameDetails;
            });
        }
    }

    private copy<T>(source: T[], target: T[]): T[] {
        target.splice(0);
        source.forEach(el => target.push(el));
        return target;
    }

    getColor(i: number) {
        if (i === 0) {
            return 'table-success';
        } else if (i >= 1 && i <= 3) {
            return 'table-info';
        } else if (i >= 4 && i <= 5) {
            return 'table-warning';
        } else if (i >= 15 && i <= 17) {
            return 'table-danger';
        }
    }
}
