import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

@Component({
    selector: 'app-tipp',
    templateUrl: './tipp.component.html',
    styleUrls: ['./tipp.component.css']
})
export class TippComponent extends TippCommonComponent implements OnInit {

    constructor(cookieService: CookieService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(cookieService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
