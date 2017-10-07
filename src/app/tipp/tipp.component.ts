import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';

@Component({
  selector: 'tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css']
})
export class TippComponent extends TippCommonComponent {

  constructor(cookieService: CookieService, tippService: TippService) {
    super(cookieService,  tippService);
  }

}
