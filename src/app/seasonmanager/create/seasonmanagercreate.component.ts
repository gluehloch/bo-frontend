import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerCreateService } from './seasonmanagercreate.service';
import { CreateSeasonModel } from './create-season-model';

import { SeasonType, TeamType } from '../../betoffice-json/betofficetype';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-season-manager-create',
  templateUrl: './seasonmanagercreate.component.html',
  styleUrls: ['./seasonmanagercreate.component.css']
})

export class SeasonManagerCreateComponent implements OnInit {

  model: CreateSeasonModel;

  constructor(private router: Router, private route: ActivatedRoute, private seasonManagerCreateService: SeasonManagerCreateService) {
    this.model = new CreateSeasonModel();
    this.model.season = {
      id: 0,
      name: '',
      openligaLeagueSeason: '',
      openligaLeagueShortcut: '',
      currentRoundId: 0,
      teamType: 'DFB',
      seasonType: 'LEAGUE',
      rounds: [],
      year: ''
    };
    this.model.submitted = false;
  }

  ngOnInit() {
  }

  createSeason() {
    this.model.submitted = true;
    this.seasonManagerCreateService.createSeason(this.model.season).subscribe(
      (storedSeason: Rest.SeasonJson) => this.model.season = storedSeason
    );
  }

}
