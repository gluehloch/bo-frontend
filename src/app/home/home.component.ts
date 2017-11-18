import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentSeasonId = environment.currentSeasonId;
  teilnehmer: Rest.UserTableJson;

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
