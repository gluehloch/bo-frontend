import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';
import { PartyService } from './party.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'user',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  partiesModel: Array<Rest.PartyJson>;

  constructor(private partyService: PartyService) {
    this.partiesModel = new Array();
  }

  private sortParties() {
    this.partiesModel.sort((a, b) => a.nickname.localeCompare(b.nickname));
  }

  ngOnInit() {
    this.partyService.findParties().subscribe((parties: Array<Rest.PartyJson>) => {
      this.partiesModel = parties;
    });
  }

  updateParty(party: Rest.PartyJson) {
    this.partyService.updateParty(party).subscribe((party: Rest.PartyJson) => {
      this.sortParties();        
    });
  }

  addParty(party: Rest.PartyJson) {
    this.partyService.addParty(party).subscribe((party: Rest.PartyJson) => {
      this.partiesModel.push(party);
      this.sortParties();
    });
  }

}
