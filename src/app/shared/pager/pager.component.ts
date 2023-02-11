import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

export class PagerModel {
    currentPage = 0;
    pages = 0;
}

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

    @Input() pagerModel = new PagerModel();
    @Output() pageEventEmitter = new EventEmitter<number>();

    slices: Array<number> = [];

    constructor() {
    }

    ngOnInit() {
        this.calculateSlices();
    }

    ngOnChanges(changes: { [property: string]: SimpleChanges }) {
        let change: SimpleChanges = changes['pagerModel']; 

        console.log('Change detected: pagerModel=', change, this.pagerModel);

        const changedPagerModel = change.currentValue as any as PagerModel;
        this.pagerModel.currentPage = changedPagerModel.currentPage;
        this.pagerModel.pages = changedPagerModel.pages;
        this.calculateSlices();
    }

    private emitPageChangeEvent(): void {
        this.pageEventEmitter.emit(this.pagerModel.currentPage);
    }

    private calculateSlices(): void {
        this.slices = Array(this.pagerModel.pages).fill(this.pagerModel.pages - 1).map((x, i) => i);
        /*
        if (this.pageParam) {
            this.totalPages = Math.floor(this.pageParam.numberOfElements / this.pageParam.size);
            if (this.pageParam.numberOfElements % this.pageParam.size > 0) {
                this.totalPages++;
            }
            this.paginatorModel = Array(this.totalPages).fill(this.totalPages - 1).map((x, i) => i);
        }
        */
    }

    previousPage(): void {
        if (this.pagerModel.currentPage > 0) {
            this.pagerModel.currentPage--;
            this.emitPageChangeEvent();
        } else {
            throw Error('previousPage(): Out of pager index.');
        }
    }

    gotoPage(pageNo: number): void {
        if (pageNo > 0 && pageNo < this.pagerModel.pages) {
            this.pagerModel.currentPage = pageNo;
            this.emitPageChangeEvent();
        } else {
            throw Error('gotoPage(): Out of pager index.');
        }
    }

    nextPage(): void {
        if (this.pagerModel.currentPage < this.pagerModel.pages - 1) {
            this.pagerModel.currentPage++
            this.emitPageChangeEvent();
        } else {
            throw Error('nextPage(): Out of pager index.');
        }
    }

}
