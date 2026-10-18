import { Component, OnInit, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { PartyService } from './party.service';
import { NavigationRouterService } from '../../navigationrouter.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
    selector: 'party',
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.css'],
    imports: [SpinnerComponent],
    standalone: true,
})
export class PartyComponent implements OnInit {

  loading = signal(true);
  partiesModel: Array<Rest.PartyJson>;

  constructor(
      private router: Router,
      private partyService: PartyService,
      private navigationRouterService: NavigationRouterService) {
    this.partiesModel = new Array();
  }

  private sortParties() {
    this.partiesModel.sort((a, b) => a.nickname.localeCompare(b.nickname));
  }

  ngOnInit() {
    this.partyService.findParties().subscribe({
      next: (parties: Array<Rest.PartyJson>) => {
        this.partiesModel = parties;
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_ADMIN_MENU);
      },
      error: (err: any) => {
        console.error('Failed to load parties', err);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  updateParty(party: Rest.PartyJson) {
    this.router.navigate(['./chiefop/party/update', party.id]);
  }

  createParty() {
    this.router.navigate(['./chiefop/party/create']);
  }

  addParty(party: Rest.PartyJson) {
    this.partyService.addParty(party).subscribe((updatedParty: Rest.PartyJson) => {
      this.partiesModel.push(updatedParty);
      this.sortParties();
    });
  }

}
