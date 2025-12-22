import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';

import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';

@Component({
    selector: 'app-tipp-mobile',
    templateUrl: './tipp-mobile.component.html',
    styleUrls: ['./tipp-mobile.component.css'],
    imports: [SpinnerComponent, RouterLink, RouterLinkActive, FormsModule, NgClass, DatePipe],
    standalone: true,
})
export class TippMobileComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

    /**
     * Set a quick tip score for common match results
     */
    setQuickTip(tipp: any, homeGoals: number, guestGoals: number): void {
        if (!tipp.game.finished) {
            tipp.homeGoals = homeGoals;
            tipp.guestGoals = guestGoals;
        }
    }

}
