import { Component, OnInit } from "@angular/core";
import { CheckableParty } from "./checkable-party";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-community-update',
    templateUrl: './communityupdate.component.html',
    styleUrls: ['./communityupdate.component.css']
})
export class CommunityUpdateComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        /*
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.seasonManagerUpdateService.findSeason(id).subscribe(
                (season: Rest.SeasonJson) => this.model.season = season);

            this.findParties(id);
            this.findPotentialParties(id);
        });
        */
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
