import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

    @Input() page: Rest.PageParam | undefined;
    @Output() pageEventEmitter = new EventEmitter<Rest.PageParam>();

    readonly defaultPageParam = {
        number: 0,           // Die aktuelle Seite (0..N)
        size: 10,            // Die Seitengroesse
        numberOfElements: 0, // Anazhl aller Zeiien
    } as Rest.Slice;

    /** Current page and page size */
    pageParam = this.defaultPageParam;
    /** For every page a number  */
    private paginatorModel: Array<number> = [];
    private totalPages = 0;

    constructor() {
    }

    ngOnInit() {
        this.calculateSlices();
    }

    private emitPageChangeEvent(): void {
        this.pageEventEmitter.emit(this.page);
    }

    private calculateSlices(): void {
        if (this.pageParam) {
            this.totalPages = Math.floor(this.pageParam.numberOfElements / this.pageParam.size);
            if (this.pageParam.numberOfElements % this.pageParam.size > 0) {
                this.totalPages++;
            }
            this.paginatorModel = Array(this.totalPages).fill(this.totalPages - 1).map((x, i) => i);
        }
    }

    previousPage(): void {
        if (this.pageParam && this.pageParam.number > 0) {
            this.pageParam.number--;
            this.emitPageChangeEvent();
        }
    }

    gotoPage(pageNo: number): void {
        this.pageParam.number = pageNo;
        this.emitPageChangeEvent();
    }

    nextPage(): void {
        if (this.pageParam && this.pageParam.number < this.totalPages - 1) {
            this.pageParam.number++
            this.emitPageChangeEvent();
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
