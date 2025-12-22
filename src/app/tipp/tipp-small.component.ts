import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';

import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';
import { GameResultComponent } from '../shared/gameresult/gameresult.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';

@Component({
    selector: 'app-tipp-small',
    templateUrl: './tipp-small.component.html',
    styleUrls: ['./tipp-small.component.css'],
    standalone: true,
    imports: [SpinnerComponent, RouterLink, RouterLinkActive, FormsModule, GameResultComponent, NgClass, DatePipe]
})
export class TippSmallComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
