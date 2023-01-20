import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { map } from 'rxjs/operators';

import { CommunityAdminService } from './communityadmin.service';
import { NavigationRouterService } from '../../navigationrouter.service';

import { environment } from '../../../environments/environment';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';

@Component({
    selector: 'app-community-admin',
    templateUrl: './communityadmin.component.html',
    styleUrls: ['./communityadmin.component.css']
})
export class CommunityAdminComponent implements OnInit {

    slices: Array<number> = [];
    communityPage: Rest.Page<Rest.CommunityJson> | undefined;
    seasons: Array<Rest.SeasonJson>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private communityAdminService: CommunityAdminService,
        private navigationRouterService: NavigationRouterService) {

        this.communityPage = undefined;
        this.seasons = [];
  }

    ngOnInit() {
        /*
        console.log('this.route.params', this.route.params);
        console.log('this.route.snapshot', this.route.snapshot);
        console.log('this.route.queryParamMap', this.route.queryParamMap);
        console.log('this.route.queryParams', this.route.queryParams);
        console.log('this.route.data', this.route.data);
        console.log('this.route.url', this.route.url);
        */

        this.communityAdminService.findCommunities().subscribe(communityPage => {
            console.log(communityPage);
            this.communityPage = communityPage;
            this.slices = Array(communityPage.totalPages).fill(communityPage.totalPages - 1).map((x, i) => i);
        });
/*
        this.route.queryParams.subscribe(params => {
            console.log('Community Admin 2', params);
        });
*/
    }

    previousPage(): void {
    }

    gotoPage(pageNo: number): void {
    }

    nextPage(): void {
    }

    /*
    updateSeason(season: Rest.SeasonJson) {
        this.router.navigate(['./chiefop/seasonmanager/update', season.id]);
    }

    updateMatchday(season: Rest.SeasonJson) {
        this.router.navigate(['chiefop/seasonmanager/updatematchday'], { queryParams: {seasonId: season.id }});
    }

    createSeason() {
        this.router.navigate(['./chiefop/seasonmanager/create']);
    }
    */

}
