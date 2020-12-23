import { Component, Input, OnInit } from '@angular/core'; // First, import Input

@Component({
    selector: 'app-tippresult',
    templateUrl: './tippresult.component.html',
    styleUrls: ['./tippresult.component.css']
})
export class TippResultComponent implements OnInit {

    @Input()
    tipp: Rest.GameTippJson; // decorate the property with @Input()

    constructor() { }

    ngOnInit() {
    }

}
