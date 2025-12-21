import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TippCommonComponent } from './tipp-common.component';
import { TippService } from './tipp.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { SessionService } from '../session/session.service';

import { TippSelectorComponent } from './selector/tipp-selector.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

import { TippSmallComponent } from './tipp-small.component';

import { TipFormState } from './selector/tipp-selector.component'; 
import { TippMobileComponent } from './tipp-mobile.component';
import { TippDesktopComponent } from './tipp-desktop.component';

@Component({
    selector: 'app-tipp',
    templateUrl: './tipp.component.html',
    styleUrls: ['./tipp.component.css'],
    standalone: true,
    imports: [SpinnerComponent, TippSelectorComponent, FormsModule, TippSmallComponent, TippMobileComponent, TippDesktopComponent]
})
export class TippComponent extends TippCommonComponent implements OnInit {

    selectedFormState: { state: TipFormState | null, autoSelect: boolean } | null = null;

    constructor(
        private router: Router,
        sessionService: SessionService,
        tippService: TippService,
        navigationRouterService: NavigationRouterService) {
        super(sessionService, tippService, navigationRouterService);
    }

    ngOnInit() {
        super.onInit();
    }

    onSelectionChanged(selection: { state: TipFormState | null, autoSelect: boolean }) {
        this.selectedFormState = selection;
        /*
        if (selection.state) {
            this.navigateToForm(selection.state);
        }
        */
    }

    private navigateToForm(state: TipFormState): void {
        if (state.id === 'desktop') {
            this.router.navigate(['./tipp-desktop']);
        } else if (state.id === 'small') {
            this.router.navigate(['./tipp-small']);
        } else if (state.id === 'mobile') {
            this.router.navigate(['./tipp-mobile']);
        }
    }

}
