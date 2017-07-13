import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { PartyUpdateService } from './partyupdate.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'party',
  templateUrl: './partyupdate.component.html',
  styleUrls: ['./partyupdate.component.css']
})
export class PartyUpdateComponent implements OnInit {

  partyModel: Rest.PartyJson;

  constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyUpdateService) {
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.partyService.findParty(id).subscribe((party: Rest.PartyJson) => this.partyModel = party);
    });
  }

  updateParty(party: Rest.PartyJson) {
    this.partyService.updateParty(party).subscribe((party: Rest.PartyJson) => {
    });
  }

}
