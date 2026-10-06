import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';

import { PartyUpdateService } from './partyupdate.service';

import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

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
    imports: [FormsModule, SpinnerComponent],
    standalone: true,
})
export class PartyUpdateComponent implements OnInit {

    party = signal(new PartyModel());
    loading = signal(true);

    constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyUpdateService) {
    }

    ngOnInit() {
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.partyService.findParty(id).subscribe((party: Rest.PartyJson) => {
                this.party().copy(party);
                this.loading.set(false);
            });
        });
    }

    updateParty() {
        this.loading.set(true);
        this.partyService.updateParty(this.party()).subscribe({
            next: partyResponse => this.party().copy(partyResponse),
            error: error => {
                console.error('Request completed with an error.', error);
                this.loading.set(false);
            },
            complete: () => {
                console.info('Request completed successfully.');
                this.loading.set(false);
            }
        });
    }

    abort() {
        this.router.navigate(['./chiefop/party']);
    }

}
