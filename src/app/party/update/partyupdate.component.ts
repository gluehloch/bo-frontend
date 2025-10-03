import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';

import { PartyUpdateService } from './partyupdate.service';

import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

class PartyModel implements Rest.PartyJson {
    id: number;
    nickname: string;
    surname: string;
    name: string;
    phone: string;
    mail: string;
    password: string;
    title: string;
    emailNotificationEnabled: boolean;

    constructor() {
        this.id = 0;
        this.nickname = '';
        this.surname = '';
        this.name = '';
        this.phone = '';
        this.mail = '';
        this.password = '';
        this.title = '';
        this.emailNotificationEnabled = false;
    }

    copy(party: Rest.PartyJson) {
        this.id = party.id;
        this.nickname =  party.nickname;
        this.password = party.password;
        this.surname = party.surname;
        this.name = party.name;
        this.title = party.title;
        this.mail = party.mail;
        this.phone = party.phone;
        this.emailNotificationEnabled = party.emailNotificationEnabled;
    }
}

@Component({
    selector: 'party',
    templateUrl: './partyupdate.component.html',
    styleUrls: ['./partyupdate.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class PartyUpdateComponent implements OnInit {

    party = new PartyModel();

    constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyUpdateService) {
        this.party.id = -1;
    }

    ngOnInit() {
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.partyService.findParty(id).subscribe((party: Rest.PartyJson) => {
                this.party.copy(party);
            });
        });

        /*
        this.route.params.map(params => params['id']).subscribe((id) => {
          this.partyService.findParty(id).subscribe((party: Rest.PartyJson) => this.party = party);
        });
        */
    }

    updateParty() {
        if (!this.party.nickname) {

        }

        this.partyService.updateParty(this.party).subscribe(
            (partyResponse: Rest.PartyJson) => {
                this.party.copy(partyResponse);
            },
            error => {
                console.error('Error', error);
            },
            () => {
                console.info('Request completed.');
            }
        );
    }

    abort() {
        this.router.navigate(['./chiefop/party']);
    }

}
