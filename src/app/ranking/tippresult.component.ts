import { Component, Input, OnInit } from '@angular/core'; // First, import Input
import { Betoffice } from '../betoffice-json/model/betoffoce-data-model';

@Component({
    selector: 'app-tippresult',
    templateUrl: './tippresult.component.html',
    styleUrls: ['./tippresult.component.css']
})
export class TippResultComponent implements OnInit {

    @Input()
    tipp: Betoffice.GameTippModel | undefined; // decorate the property with @Input()

    constructor() { }

    ngOnInit() {
    }

}
