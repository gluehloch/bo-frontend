import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerCreateService } from './seasonmanagercreate.service';
import { CreateSeasonModel } from './create-season-model';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'season-manager-create',
  templateUrl: './seasonmanagercreate.component.html',
  styleUrls: ['./seasonmanagercreate.component.css']
})

export class SeasonManagerCreateComponent implements OnInit {

  model: CreateSeasonModel;

  constructor(private router: Router, private route: ActivatedRoute, private seasonManagerCreateService: SeasonManagerCreateService) {
    this.model.season = {
      id: 0,
      name: '',
      openligaLeagueSeason: '',
      openligaLeagueShortcut: '',
      teamType: null,
      seasonType: null,
      rounds: [],
      year: ''
    };
    this.model.submitted = false;
  }

  ngOnInit() {
  }

  createSeason(season: Rest.SeasonJson) {
    this.model.submitted = true;
    this.seasonManagerCreateService.createSeason(this.model.season).subscribe(
      (storedSeason: Rest.SeasonJson) => this.model.season = storedSeason
    );
  }

}
