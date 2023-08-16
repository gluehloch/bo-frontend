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
        private updateSeasonGroupTeamService: UpdateSeasonGroupTeamService) {
    }

    ngOnInit() {
        this.startProcessing();
        this.route.params.pipe(map(params => params['id'])).subscribe((seasonId) => {
            const findSeason = this.updateSeasonGroupTeamService.findSeason(seasonId);
            const findGroupTypes = this.updateSeasonGroupTeamService.findGroupTypes();
            const findSeasonGroupTypes = this.updateSeasonGroupTeamService.findGroupTypesBySeason(seasonId);
            const findGroupTeams = this.updateSeasonGroupTeamService.findGroupAndTeamsBySeason(seasonId);

            forkJoin([findSeason, findGroupTypes, findSeasonGroupTypes, findGroupTeams]).subscribe({
                next: results => {
                    this.model.season = results[0];
                    this.model.selectableGroupTypes = results[1];
                    this.model.groupTypes = results[2];
                    this.updateGroupSelectables();
                    this.model.seasonGroupTeam = results[3];
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

        this.startProcessing();
        this.updateSeasonGroupTeamService.remnoveGroupFromSeason(this.model.season.id, groupType).subscribe({
            next: season => {
                console.debug('Added group to season.');
            },
            error: error => {
                console.error('Unable to execute request.', error);
            },
            complete: () => {
               this.completeProcessing();
            }
        });
    }

    addGroup(selectedGroupType: Rest.GroupTypeJson): void {
        this.model.groupTypes.push(selectedGroupType);
        this.updateGroupSelectables();

        this.updateSeasonGroupTeamService.addGroupToSeason(this.model.season.id, selectedGroupType).subscribe({
            next: season => {
                console.debug('Removed group from season.');
            },
            error: error => {
                console.error('Unable to execute request.', error);
            },
            complete: () => {
               this.completeProcessing();
            }            
        });
    }

    private updateGroupSelectables(): void {
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
