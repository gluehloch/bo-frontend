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
  selector: 'app-season-manager-update',
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

  private mapParties(parties: Array<Rest.SeasonMemberJson>, modelParties: Array<CheckableParty>) {
    for (const party of parties) {
      modelParties.push(this.fromPartyToCheckableParty(party));
    }
  }

  private findCheckedParties(parties: Array<Rest.SeasonMemberJson>): Array<Rest.SeasonMemberJson> {
    const checkedParties: Array<Rest.SeasonMemberJson> = [];
    this.model.potentialParties.forEach(party => {
      if (party.checked) {
        const member: Rest.SeasonMemberJson = {
          id: party.id,
          nickname: party.nickname
        };
        checkedParties.push(member);
      }
    });
   return checkedParties;
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.seasonManagerUpdateService.findSeason(id).subscribe(
        (season: Rest.SeasonJson) => this.model.season = season);

      this.seasonManagerUpdateService
          .findParties(id)
          .subscribe(parties => this.mapParties(parties, this.model.parties));

      this.seasonManagerUpdateService
          .findPotentialParties(id)
          .subscribe(parties => this.mapParties(parties, this.model.potentialParties));
    });
  }

  updateSeason() {
    this.seasonManagerUpdateService.updateSeason(this.model.season).subscribe(
      (season: Rest.SeasonJson) => this.model.season = season);
  }

  addUserSeason() {
    const members = this.findCheckedParties(this.model.potentialParties);

    this.seasonManagerUpdateService
        .addUser(this.model.season.id, members)
        .subscribe(parties => this.mapParties(parties, this.model.parties));
  }

  removeUserSeason() {
    const members = this.findCheckedParties(this.model.parties);

    this.seasonManagerUpdateService
        .removeUser(this.model.season.id, members)
        .subscribe(parties => this.mapParties(parties, this.model.parties));
  }

}
