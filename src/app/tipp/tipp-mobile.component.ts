import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

@Component({
    selector: 'app-tipp-mobile',
    templateUrl: './tipp-mobile.component.html',
    styleUrls: ['./tipp-mobile.component.css']
})
export class TippMobileComponent extends TippCommonComponent {

    constructor(cookieService: CookieService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(cookieService, tippService, navigationRouterService);
    }

}
