import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';
import { GameResultComponent } from '../shared/gameresult/gameresult.component';
import { FormsModule } from '@angular/forms';
import { TippSelectorComponent } from './selector/tipp-selector.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
    selector: 'app-tipp-small',
    templateUrl: './tipp-small.component.html',
    styleUrls: ['./tipp-small.component.css'],
    standalone: true,
    imports: [DatePipe, NgIf, NgClass, FormsModule, NgFor, RouterLink, RouterLinkActive, SpinnerComponent, TippSelectorComponent, GameResultComponent]
})
export class TippSmallComponent extends TippCommonComponent implements OnInit {

    constructor(sessionService: SessionService, tippService: TippService, navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

}
