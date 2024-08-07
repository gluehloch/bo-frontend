import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class SpinnerComponent implements OnInit {

    @Input() enabled: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
