import { Component, OnInit } from '@angular/core';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-tipp-mobile',
    templateUrl: './tipp-mobile.component.html',
    styleUrls: ['./tipp-mobile.component.css']
})
export class TippMobileComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
