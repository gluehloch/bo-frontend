import { Component, OnInit } from '@angular/core';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';
import { FormsModule } from '@angular/forms';
import { TippSelectorComponent } from './selector/tipp-selector.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
    selector: 'app-tipp-mobile',
    templateUrl: './tipp-mobile.component.html',
    styleUrls: ['./tipp-mobile.component.css'],
    imports: [SpinnerComponent, NgIf, RouterLink, RouterLinkActive, TippSelectorComponent, FormsModule, NgFor, NgClass, DatePipe]
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
