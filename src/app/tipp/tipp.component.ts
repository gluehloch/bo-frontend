import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';

@Component({
  selector: 'tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css']
})
export class TippComponent extends TippCommonComponent {

  constructor(cookieService: CookieService, tippService: TippService, navigationRouterService: NavigationRouterService) {
    super(cookieService,  tippService, navigationRouterService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.navigationRouterService.activate(NavigationRouterService.ROUTE_TIPPMOBILE);
  }

}
