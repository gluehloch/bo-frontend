import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';
import { FormsModule } from '@angular/forms';
import { TippSelectorComponent } from './selector/tipp-selector.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
    selector: 'app-tipp-mobile',
    templateUrl: './tipp-mobile.component.html',
    styleUrls: ['./tipp-mobile.component.css'],
    standalone: true,
    imports: [DatePipe, NgFor, NgIf, RouterLink, RouterLinkActive, TippSelectorComponent, FormsModule, SpinnerComponent]
})
export class TippMobileComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
