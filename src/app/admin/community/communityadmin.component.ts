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

    readonly defaultPageParam = {
        page: 0,
        size: 10,
    } as Rest.PageParam;

    pageParam = this.defaultPageParam;
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
        this.findCommunities();
    }

    private findCommunities(): void {
        this.communityAdminService.findCommunities(this.pageParam).subscribe(communityPage => {
            console.log(communityPage);
            this.communityPage = communityPage;
            this.calculateSlices();
        });
    }

    private calculateSlices(): void {
        if (this.communityPage) {
            this.slices = Array(this.communityPage.totalPages).fill(this.communityPage.totalPages - 1).map((x, i) => i);
        }
    }

    previousPage(): void {
        if (this.communityPage && this.pageParam.page > 0) {
            this.pageParam.page = this.pageParam.page - 1;
            this.findCommunities();
        }
    }

    gotoPage(pageNo: number): void {
        this.pageParam.page = pageNo;
        this.findCommunities();
    }

    nextPage(): void {
        if (this.communityPage && this.pageParam.page < this.communityPage?.totalPages - 1) {
            this.pageParam.page = this.pageParam.page + 1;
            this.findCommunities();
        }
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
