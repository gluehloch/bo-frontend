import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';

import { PartyUpdateService } from './partyupdate.service';

import { FormsModule, NgForm } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
    selector: 'party',
    templateUrl: './partyupdate.component.html',
    styleUrls: ['./partyupdate.component.css'],
    imports: [FormsModule, SpinnerComponent],
    standalone: true,
})
export class PartyUpdateComponent implements OnInit {

    party = signal<Rest.PartyJson>({
        id: 0,
        nickname: '',
        surname: '',
        name: '',
        phone: '',
        mail: '',
        password: '',
        title: '',
        emailNotificationEnabled: false,
    });
    loading = signal(true);
    error = signal(false);
    success = signal(false);

    constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyUpdateService) {
    }

    ngOnInit() {
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.partyService.findParty(id).subscribe((party: Rest.PartyJson) => {
                this.party.set(party);
                this.loading.set(false);
            });
        });
    }

    updateParty(form: NgForm) {
        this.loading.set(true);
        this.partyService.updateParty(this.party()).subscribe({
            next: partyResponse => this.party.set(partyResponse),
            error: error => {
                console.error('Request completed with an error.', { error });
                this.loading.set(false);
                if (error?.status === 400) {
                    this.error.set(true);
                }
            },
            complete: () => {
                console.info('Request completed successfully.');
                form.form.markAsPristine();
                this.loading.set(false);
            }
        });
    }

    abort() {
        this.router.navigate(['./chiefop/party']);
    }

}
