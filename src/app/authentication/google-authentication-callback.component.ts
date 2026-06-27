import { Component, OnInit } from "@angular/core";
import { DatePipe, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { environment } from "src/environments/environment";

import { NavigationRouterService } from "../navigationrouter.service";
import { Router } from "@angular/router";
import { SessionService } from "../session/session.service";


@Component({
    selector: 'app-google-authentication-callback',
    templateUrl: './google-authentication-callback.component.html',
    styleUrls: ['./google-authentication-callback.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, DatePipe]
})
export class GoogleAuthenticationCallbackComponent implements OnInit {

    dateTimeFormat = environment.dateTimeFormat;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private navigationRouterService: NavigationRouterService) {
    }

    ngOnInit() {
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

}
