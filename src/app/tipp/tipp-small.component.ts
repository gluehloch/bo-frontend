import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';

@Component({
  selector: 'tipp-small',
  templateUrl: './tipp-small.component.html',
  styleUrls: ['./tipp-small.component.css']
})
export class TippSmallComponent extends TippCommonComponent {

  constructor(cookieService: CookieService, tippService: TippService) {
    super(cookieService,  tippService);
  }

}
