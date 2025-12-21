import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { NavigationRouterService } from '../navigationrouter.service';
import { environment } from '../../environments/environment';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [RouterLink]
})
export class HomeComponent implements OnInit {

    currentSeasonId = environment.currentSeasonId;
    teilnehmer: Rest.UserTableJson | undefined;

    constructor(
        private homeService: HomeService,
        private navigationRouterService: NavigationRouterService) {
    }

    ngOnInit() {
        this.homeService.calculate(this.currentSeasonId)
            .subscribe((userTable: Rest.UserTableJson) => {
                this.teilnehmer = userTable;
                this.navigationRouterService.activate(NavigationRouterService.ROUTE_HOME);
            });
    }

}
