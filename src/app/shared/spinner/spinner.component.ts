import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
    imports: [],
    standalone: true,
})
export class SpinnerComponent implements OnInit {

    @Input() enabled: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
