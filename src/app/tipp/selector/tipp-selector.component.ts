import { Component, Input } from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-tipp-selector',
    templateUrl: './tipp-selector.component.html',
    styleUrls: ['./tipp-selector.component.css']
})
export class TippSelectorComponent {

    states = [
        {id: 'desktop', name: 'Desktop'},
        {id: 'small', name: 'Small Screen'},
        {id: 'mobile', name: 'Mobile Screen'}
    ];

    form = new FormGroup({
        state: new FormControl(this.states[0]),
    });

    @Input('selectionState') selectionState: string;

    constructor() {
    }

}
