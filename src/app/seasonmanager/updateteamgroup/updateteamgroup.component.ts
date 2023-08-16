import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

import { UpdateSeasonGroupTeamService } from './updateteamgroup.service';
import { UpdateTeamGroupModel } from './update-team-group-model';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-updateteamgroup',
    templateUrl: './updateteamgroup.component.html',
    styleUrls: ['./updateteamgroup.component.css']
})
export class UpdateTeamGroupComponent implements OnInit {

    model = new UpdateTeamGroupModel();
    processing = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private upadateSeasonGroupTeamService: UpdateSeasonGroupTeamService) {
    }

    ngOnInit() {
        this.startProcessing();
        this.route.params.pipe(map(params => params['id'])).subscribe((seasonId) => {
            const findSeason = this.upadateSeasonGroupTeamService.findSeason(seasonId);
            const findGroupTypes = this.upadateSeasonGroupTeamService.findGroupTypes();
            const findSeasonGroupTypes = this.upadateSeasonGroupTeamService.findGroupTypesBySeason(seasonId);

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

    removeGroup(groupType: Rest.GroupTypeJson): void {
        this.model.groupTypes = this.model.groupTypes.filter(i => i.id !== groupType.id);
        this.model.selectableGroupTypes.push(groupType);
        this.model.selectableGroupTypes.sort((i, j) => i.name.localeCompare(j.name));
    }

    addGroup(selectedGroupType: Rest.GroupTypeJson): void {
        this.model.groupTypes.push(selectedGroupType);
        this.model.selectableGroupTypes = this.model.selectableGroupTypes
            .filter(i => (this.model.groupTypes.find(j => j.id === i.id)) === undefined);
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
