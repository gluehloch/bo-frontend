import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateSeasonGroupTeamService } from './updateteamgroup.service';

class SeasonGroupTeamModel {
    seasonId: number | undefined;
    season: Rest.SeasonJson | undefined;
    group: Rest.GroupTypeJson | undefined;
    teams: Array<Rest.TeamJson> | undefined;
}

@Component({
    selector: 'app-updateteamgroup',
    templateUrl: './updateteamgroup.component.html',
    styleUrls: ['./updateteamgroup.component.css']
})
export class UpdateTeamGroupComponent implements OnInit {

    seasonGroupTeamModel = new SeasonGroupTeamModel();

    constructor(private router: Router,
        private route: ActivatedRoute,
        private upadateSeasonGroupTeamService: UpdateSeasonGroupTeamService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.seasonGroupTeamModel.seasonId = params['seasonId'];
            this.findTeams();
            this.findSeason();
        });
    }

    private findTeams(): void {
        this.upadateSeasonGroupTeamService.findTeams()
            .subscribe((teams: Rest.TeamJson[]) => {
                this.seasonGroupTeamModel.teams = teams;
            });
    }

    private findSeason(): void {
        if (this.seasonGroupTeamModel.seasonId) {
            this.upadateSeasonGroupTeamService.findSeason(this.seasonGroupTeamModel.seasonId)
                .subscribe((season: Rest.SeasonJson) => {
                    this.seasonGroupTeamModel.season = season;
                });
        }
    }
}
