import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerCreateService } from './seasonmanagercreate.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'season-manager-create',
  templateUrl: './seasonmanagercreate.component.html',
  styleUrls: ['./seasonmanagercreate.component.css']
})
export class SeasonManagerCreateComponent implements OnInit {

  season: Rest.SeasonJson;

  constructor(private router: Router, private route: ActivatedRoute, private seasonManagerCreateService: SeasonManagerCreateService) {
    this.season = {
      id: 0,
      name: '',
      openligaLeagueSeason: '',
      openligaLeagueShortcut: '',
      teamType: null,
      seasonType: null,
      rounds: [],
      year: ''
    };
  }

  ngOnInit() {
  }

  createSeason(season: Rest.SeasonJson) {
    this.seasonManagerCreateService.createSeason(this.season).subscribe(
      (storedSeason: Rest.SeasonJson) => this.season = storedSeason
    );
  }

}
