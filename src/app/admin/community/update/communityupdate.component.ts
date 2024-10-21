import { map } from 'rxjs/operators';

import { Component, Input, OnInit, signal } from "@angular/core";
import { CheckableParty } from "./checkable-party";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from "@angular/common";
import { CommunityUpdateService } from "./communityupdate.service";

import { AuthenticationWarningComponent } from '../../../authenticationwarning/authenticationwarning.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

type PartialCommunityJson = {
    id: number;
    name: string;
    shortName: string;
    year: string;
    communityManager: {
        nickname: string;
    },
    season: {
        name: string;
    }
}

@Component({
    selector: 'app-community-update',
    templateUrl: './communityupdate.component.html',
    styleUrls: ['./communityupdate.component.css'],
    standalone: true,
    imports: [SpinnerComponent, AuthenticationWarningComponent, NgFor, NgIf, FormsModule],
})
export class CommunityUpdateComponent implements OnInit {

    contentReady = signal(false);
    model: Rest.CommunityJson | PartialCommunityJson = {
        id: 0,
        name: '',
        shortName: '',
        year: '',
        communityManager: {
            nickname: '' 
        },
        season: {
            name: ''
        },
    };

    @Input()
    set id(communityId: number) {
        this.communityUpdateService.findCommunity(communityId).subscribe(
            (community: Rest.CommunityJson) => this.model = community,
            (error) => console.error(error),
            ()  => this.contentReady.set(true)
        );
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private communityUpdateService: CommunityUpdateService) {
    }

    ngOnInit() {
        /*
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.communityUpdateService.findCommunity(id).subscribe(
                (community: Rest.CommunityJson) => this.model = community);
            // this.findParties(id);
            // this.findPotentialParties(id);
        });
        */
    }

    updateCommunity() {
    }

    abort() {
    }

    /*
    private fromPartyToCheckableParty(party: Rest.SeasonMemberJson): CheckableParty {
        const checkableParty = new CheckableParty();
        checkableParty.id = party.id;
        checkableParty.nickname = party.nickname;
        checkableParty.checked = false;
        return checkableParty;
    }

    private mapParties(parties: Array<Rest.SeasonMemberJson>, modelParties: Array<CheckableParty>) {
        modelParties.length = 0;
        for (const party of parties) {
            modelParties.push(this.fromPartyToCheckableParty(party));
        }
    }

    private collectCheckedParties(parties: Array<CheckableParty>): Array<Rest.SeasonMemberJson> {
        const checkedParties: Array<Rest.SeasonMemberJson> = [];
        parties.forEach(party => {
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
    */

    /*
    private findParties(id: number) {
        this.seasonManagerUpdateService
            .findParties(id)
            .subscribe(parties => this.mapParties(parties, this.model.parties));
    }

    private findPotentialParties(id: number) {
        this.seasonManagerUpdateService
            .findPotentialParties(id)
            .subscribe(parties => this.mapParties(parties, this.model.potentialParties));
    }
    */

    /*
    addUserSeason() {
        const members = this.collectCheckedParties(this.model.potentialParties);

        this.seasonManagerUpdateService
            .addUser(this.model.season.id, members)
            .subscribe(
                parties => {
                    this.mapParties(parties, this.model.parties);
                    this.findPotentialParties(this.model.season.id);
                },
                error => console.error(error));
    }

    removeUserSeason() {
        const members = this.collectCheckedParties(this.model.parties);

        this.seasonManagerUpdateService
            .removeUser(this.model.season.id, members)
            .subscribe(
                parties => {
                    this.mapParties(parties, this.model.parties);
                    this.findPotentialParties(this.model.season.id);
                },
                error => console.error(error));
    }
    */

}
