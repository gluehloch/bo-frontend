import { Component, OnInit } from '@angular/core';

import { RankingService } from '../ranking/ranking.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentSeasonId = environment.currentSeasonId;
  ranking: Rest.UserTableJson;

  constructor(
      private rankingService: RankingService,
      private navigationRouterService: NavigationRouterService) {
    this.rankingService = rankingService;
  }

  ngOnInit() {
    this.navigationRouterService.activate(NavigationRouterService.ROUTE_HOME);
  }

}
