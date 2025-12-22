import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';

import { GameResultComponent } from '../shared/gameresult/gameresult.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';

@Component({
    selector: 'app-tipp-desktop',
    templateUrl: './tipp-desktop.component.html',
    styleUrls: ['./tipp-desktop.component.css'],
    imports: [SpinnerComponent, RouterLink, RouterLinkActive, FormsModule, GameResultComponent, NgClass, DatePipe],
    standalone: true,
})
export class TippDesktopComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
