import { Component } from '@angular/core';

import { NavigationRouterService } from '../../navigationrouter.service';

@Component({
    selector: 'app-tipp-selector',
    templateUrl: './tipp-selector.component.html',
    styleUrls: ['./tipp-selector.component.css']
})
export class TippSelectorComponent {

    constructor(navigationRouterService: NavigationRouterService) {
    }

}
