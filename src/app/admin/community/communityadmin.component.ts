import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CommunityAdminService } from './communityadmin.service';

import { PagerModel } from 'src/app/shared/pager/pager.component';
import { PagerComponent } from '../../shared/pager/pager.component';

import { AuthenticationWarningComponent } from '../../authenticationwarning/authenticationwarning.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
    selector: 'app-community-admin',
    templateUrl: './communityadmin.component.html',
    styleUrls: ['./communityadmin.component.css'],
    imports: [SpinnerComponent, AuthenticationWarningComponent, PagerComponent],
    standalone: true,
})
export class CommunityAdminComponent implements OnInit {

    readonly defaultPageParam = {
        page: 0,
        size: 10,
    } as Rest.PageParam;

    contentReady = signal(false);
    pagerModel = new PagerModel();
    communityPage: Rest.Page<Rest.CommunityJson> | undefined;
    seasons: Array<Rest.SeasonJson>;

    constructor(
        private router: Router,
        private communityAdminService: CommunityAdminService) {

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
        this.contentReady.set(false);
        this.communityAdminService.findCommunities(pageParam).subscribe(
            communityPage => {
                console.log(communityPage);
                this.communityPage = communityPage;
                this.pagerModel = {
                    currentPage: communityPage.number,
                    pages: communityPage.totalPages,
                }
            },
            error => {
                console.log('Community request failed. ', error);
                this.contentReady.set(true);
            },
            () => {
                this.contentReady.set(true);
            }
        );
    }

    updateCommunity(community: Rest.CommunityJson) {
        this.router.navigate(['./chiefop/community/update', community.id]);
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
