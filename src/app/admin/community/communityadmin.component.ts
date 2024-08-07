import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

import { CommunityAdminService } from './communityadmin.service';
import { NavigationRouterService } from '../../navigationrouter.service';

import { environment } from '../../../environments/environment';

import { PagerModel } from 'src/app/shared/pager/pager.component';
import { PagerComponent } from '../../shared/pager/pager.component';
import { NgFor } from '@angular/common';
import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';

@Component({
    selector: 'app-community-admin',
    templateUrl: './communityadmin.component.html',
    styleUrls: ['./communityadmin.component.css'],
    standalone: true,
    imports: [AuthenticationWarningComponent, NgFor, PagerComponent]
})
export class CommunityAdminComponent implements OnInit {

    readonly defaultPageParam = {
        page: 0,
        size: 10,
    } as Rest.PageParam;

    pagerModel = new PagerModel();
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
        this.findCommunities(this.defaultPageParam);
    }

    updatePager(currentPage: number) {
        this.findCommunities({page: currentPage, size: this.defaultPageParam.size});
    }

    private findCommunities(pageParam: Rest.PageParam): void {
        this.communityAdminService.findCommunities(pageParam).subscribe(communityPage => {
            console.log(communityPage);
            this.communityPage = communityPage;
            this.pagerModel = {
                currentPage: communityPage.number,
                pages: communityPage.totalPages,
            }
        });
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
