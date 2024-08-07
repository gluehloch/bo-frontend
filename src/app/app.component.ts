import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { CookieData, CookieService } from './app.cookie.service';
import { NgcCookieConsentService, NgcNoCookieLawEvent, NgcStatusChangeEvent, NgcInitializeEvent } from 'ngx-cookieconsent';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
