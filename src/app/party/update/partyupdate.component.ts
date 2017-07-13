import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';

import { PartyUpdateService } from './partyupdate.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'party',
  templateUrl: './partyupdate.component.html',
  styleUrls: ['./partyupdate.component.css']
})
export class PartyUpdateComponent implements OnInit {

  partiesModel: Array<Rest.PartyJson>;

  constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyUpdateService) {
    this.partiesModel = new Array();
  }

  private sortParties() {
    this.partiesModel.sort((a, b) => a.nickname.localeCompare(b.nickname));
  }

  ngOnInit() {
    /*
    this.route.params.
this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')))
    .subscribe((hero: Hero) => this.hero = hero);

    let id = this.route.snapshot. 'id');
    */
  }

  updateParty(party: Rest.PartyJson) {
    this.partyService.updateParty(party).subscribe((party: Rest.PartyJson) => {
      this.sortParties();
    });
  }

}
