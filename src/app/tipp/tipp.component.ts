import { Component, OnInit } from '@angular/core';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-tipp',
    templateUrl: './tipp.component.html',
    styleUrls: ['./tipp.component.css']
})
export class TippComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
