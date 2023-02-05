import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

    @Input() page: Rest.PageParam | undefined;
    @Output() pageEvent = new EventEmitter<boolean>();

    readonly defaultPageParam = {
        page: 0,
        size: 10,
    } as Rest.PageParam;

    seasons: Array<Rest.SeasonJson>;
    pageParam = this.defaultPageParam;
    slices: Array<number> = [];

    pages: Rest.Page<Rest.CommunityJson> | undefined;

    constructor(
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
