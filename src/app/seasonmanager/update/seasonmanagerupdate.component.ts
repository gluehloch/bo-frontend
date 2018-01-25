import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerUpdateService } from './seasonmanagerupdate.service';
import { UpdateSeasonModel } from './update-season-model';

import { SeasonType, TeamType } from '../../betoffice-json/betofficetype';

import { environment } from '../../../environments/environment';
import { forEach } from '@angular/router/src/utils/collection';
import { CheckableParty } from 'app/seasonmanager/update/checkable-party';

@Component({
  selector: 'season-manager-update',
  templateUrl: './seasonmanagerupdate.component.html',
  styleUrls: ['./seasonmanagerupdate.component.css']
})
export class SeasonManagerUpdateComponent implements OnInit {

  model: UpdateSeasonModel;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private seasonManagerUpdateService: SeasonManagerUpdateService) {

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

  private fromPartyToCheckableParty(party: Rest.SeasonMemberJson): CheckableParty {
    const checkableParty = new CheckableParty();
    checkableParty.id = party.id;
    checkableParty.nickname = party.nickname;
    checkableParty.checked = false;
    return checkableParty;
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.seasonManagerUpdateService.findSeason(id).subscribe(
        (season: Rest.SeasonJson) => this.model.season = season);

      this.seasonManagerUpdateService.findParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => {
          for (const party of parties) {
            this.model.parties.push(this.fromPartyToCheckableParty(party));
          }
        });

      this.seasonManagerUpdateService.findPotentialParties(id).subscribe(
        (parties: Array<Rest.SeasonMemberJson>) => {
          for (const party of parties) {
            this.model.potentialParties.push(this.fromPartyToCheckableParty(party));
          }
        });
    });
  }

  updateSeason() {
    this.seasonManagerUpdateService.updateSeason(this.model.season).subscribe(
      (season: Rest.SeasonJson) => this.model.season = season);
  }

  addUserSeason() {
    this.model.parties.forEach(party => {
      console.log(party.nickname + ' => '  + party.checked);
    });
  }

  removeUserSeason() {
    this.model.parties.forEach(party => {
      console.log(party.nickname + ' => '  + party.checked);
    });
  }

}
