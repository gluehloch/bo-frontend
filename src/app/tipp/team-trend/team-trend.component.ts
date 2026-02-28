import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';

import { ResearchService } from '../../research/research.service';

type TrendResult = 'W' | 'D' | 'L';

@Component({
    selector: 'app-team-trend',
    templateUrl: './team-trend.component.html',
    styleUrls: ['./team-trend.component.css'],
    standalone: true,
    imports: [NgClass]
})
export class TeamTrendComponent implements OnInit, OnChanges {

    @Input() team: Rest.TeamJson | undefined;
    @Input() limit = 5;

    trend: TrendResult[] = [];

    constructor(private researchService: ResearchService) {}

    ngOnInit() {
        this.loadTrend();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['team'] && !changes['team'].firstChange) {
            this.loadTrend();
        }
    }

    private loadTrend() {
        if (!this.team) return;
        this.trend = [];
        this.researchService.findGamesWithTeam(this.team.id, this.limit).subscribe({
            next: (history: Rest.HistoryTeamVsTeamJson) => {
                this.trend = history.games.map(game => this.calculateResult(game));
            },
            error: () => {
                this.trend = [];
            }
        });
    }

    private calculateResult(game: Rest.TeamVsTeamJson): TrendResult {
        if (!this.team) return 'D';
        const teamNames = [this.team.name, this.team.longName, this.team.shortName, this.team.xshortName];
        const isHome = teamNames.some(n => n && n.trim().toLowerCase() === game.homeTeamName.trim().toLowerCase());
        if (isHome) {
            if (game.homeTeamGoals > game.guestTeamGoals) return 'W';
            if (game.homeTeamGoals === game.guestTeamGoals) return 'D';
            return 'L';
        } else {
            if (game.guestTeamGoals > game.homeTeamGoals) return 'W';
            if (game.guestTeamGoals === game.homeTeamGoals) return 'D';
            return 'L';
        }
    }

    trendLabel(result: TrendResult): string {
        if (result === 'W') return 'S';
        if (result === 'D') return 'U';
        return 'N';
    }

    trendTitle(result: TrendResult): string {
        if (result === 'W') return 'Sieg';
        if (result === 'D') return 'Unentschieden';
        return 'Niederlage';
    }

}
