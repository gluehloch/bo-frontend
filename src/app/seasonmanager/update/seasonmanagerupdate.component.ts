import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerUpdateService } from './seasonmanagerupdate.service';
import { UpdateSeasonModel } from './update-season-model';

import { SeasonType, TeamType } from '../../betoffice-json/betofficetype';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'season-manager-update',
  templateUrl: './seasonmanagerupdate.component.html',
  styleUrls: ['./seasonmanagerupdate.component.css']
})
export class SeasonManagerUpdateComponent implements OnInit {

  model: UpdateSeasonModel;

  constructor(private router: Router, private route: ActivatedRoute, private seasonManagerUpdateService: SeasonManagerUpdateService) {
    this.model = new UpdateSeasonModel();
    this.model.parties = [];
    this.model.potentialParties = [];
    this.model.season = {
      id: 0,
      name: '',
      openligaLeagueSeason: '',
      openligaLeagueShortcut: '',
      teamType: 'DFB',
      seasonType: 'LEAGUE',
      rounds: [],
      year: ''
    };
    this.model.submitted = false;
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.seasonManagerUpdateService.findSeason(id).subscribe(
        (season: Rest.SeasonJson) => this.model.season = season);

      this.seasonManagerUpdateService.findParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => this.model.parties = parties);

      this.seasonManagerUpdateService.findPotentialParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => this.model.potentialParties = parties);
    });
  }

  updateSeason() {
    this.seasonManagerUpdateService.updateSeason(this.model.season).subscribe(
      (season: Rest.SeasonJson) => this.model.season = season);
  }

}
