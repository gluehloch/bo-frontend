import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { map } from 'rxjs/operators';

import { SeasonManagerService } from './seasonmanager.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';
import { Sorting } from '../betoffice-json/model/Sorting';

@Component({
    selector: 'app-season-manager',
    templateUrl: './seasonmanager.component.html',
    styleUrls: ['./seasonmanager.component.css']
})
export class SeasonManagerComponent implements OnInit {

    seasons: Array<Rest.SeasonJson>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seasonManagerService: SeasonManagerService,
        private navigationRouterService: NavigationRouterService) {

        this.seasons = new Array<Rest.SeasonJson>();
  }

    ngOnInit(): void {
        console.log('SeasonManagerComponent::ngOnInit');
        this.seasonManagerService.findSeasons().subscribe(
            (seasons: Array<Rest.SeasonJson>) => {
                this.navigationRouterService.activate(NavigationRouterService.ROUTE_ADMIN_MENU);
                this.seasons = seasons.sort(Sorting.compareSeason);
            }
        );
    }

    updateSeason(season: Rest.SeasonJson): void {
        this.router.navigate(['./chiefop/seasonmanager/update', season.id]);
    }

    updateTeamGroup(season: Rest.SeasonJson): void {
        this.router.navigate(['./chiefop/seasonmanager/updateteamgroup', season.id]);
    }

    updateMatchday(season: Rest.SeasonJson): void {
        this.router.navigate(['./chiefop/seasonmanager/updatematchday'], { queryParams: {seasonId: season.id}});
    }

    createSeason(): void {
        this.router.navigate(['./chiefop/seasonmanager/create']);
    }

}
