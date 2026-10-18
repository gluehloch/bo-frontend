import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PartyService } from '../party.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
    selector: 'party-add',
    templateUrl: './add.component.html',
    imports: [FormsModule, SpinnerComponent],
    standalone: true,
})
export class PartyAddComponent {

    party: Rest.PartyJson = {
        id: 0,
        nickname: '',
        surname: '',
        name: '',
        phone: '',
        mail: '',
        password: '',
        title: '',
        emailNotificationEnabled: false,
    };
    loading = signal(false);
    error = signal(false);

    constructor(private router: Router, private partyService: PartyService) {
    }

    addParty() {
        this.loading.set(true);
        this.partyService.createParty(this.party).subscribe({
            next: () => this.router.navigate(['./chiefop/party']),
            error: error => {
                console.error('Request completed with an error.', { error });
                this.loading.set(false);
                if (error?.status === 400) {
                    this.error.set(true);
                }
            }
        });
    }

    abort() {
        this.router.navigate(['./chiefop/party']);
    }
}