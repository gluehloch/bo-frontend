import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerService } from './seasonmanager.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'season-manager',
  templateUrl: './seasonmanager.component.html',
  styleUrls: ['./seasonmanager.component.css']
})
export class SeasonManagerComponent implements OnInit {

  seasons: Array<Rest.SeasonJson>;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private seasonManagerService: SeasonManagerService,
      private navigationRouterService: NavigationRouterService) {
    this.seasons = new Array<Rest.SeasonJson>();
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.seasonManagerService.findSeasons().subscribe(
        (seasons: Array<Rest.SeasonJson>) => {
          this.navigationRouterService.activate(NavigationRouterService.ROUTE_ADMIN_MENU);
          this.seasons = seasons.sort((s1, s2) => s2.id - s1.id);
        }
      );
    });
  }

  updateSeason(season: Rest.SeasonJson) {
    this.router.navigate(['./chiefop/seasonmanager/update', season.id]);
  }

  updateMatchday(season: Rest.SeasonJson) {
    this.router.navigate(['chiefop/seasonmanager/updatematchday', season.id]);
  }

  createSeason() {
    this.router.navigate(['./chiefop/seasonmanager/create']);
  }

}
