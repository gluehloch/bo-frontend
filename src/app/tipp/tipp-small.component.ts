import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

@Component({
    selector: 'app-tipp-small',
    templateUrl: './tipp-small.component.html',
    styleUrls: ['./tipp-small.component.css']
})
export class TippSmallComponent extends TippCommonComponent implements OnInit {

    constructor(cookieService: CookieService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(cookieService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
