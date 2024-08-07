import { Component, Input, OnInit } from '@angular/core'; // First, import Input
import { Betoffice } from '../betoffice-json/model/betoffice-data-model';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-tippresult',
    templateUrl: './tippresult.component.html',
    styleUrls: ['./tippresult.component.css'],
    standalone: true,
    imports: [NgIf, NgClass]
})
export class TippResultComponent implements OnInit {

    @Input()
    tipp: Betoffice.GameTippModel | undefined; // decorate the property with @Input()

    constructor() { }

    ngOnInit() {
    }

}
