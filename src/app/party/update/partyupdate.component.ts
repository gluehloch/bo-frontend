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

  party: Rest.PartyJson;

  constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyUpdateService) {
    let party = {
      id: 0,
      nickname: '',
      surname: '',
      name: '',
      phone: '',
      mail: '',
      password: '',
      title: ''
    }
    this.party = party;
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.partyService.findParty(id).subscribe((party: Rest.PartyJson) => this.party = party);
    });
  }

  updateParty() {
    this.partyService.updateParty(this.party).subscribe((party: Rest.PartyJson) => this.party = party);
  }

}
