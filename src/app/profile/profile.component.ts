import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { Router } from "@angular/router";

import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { NavigationRouterService } from "../navigationrouter.service";

import { ProfileService } from "./profile.service";
import { SessionService } from "../session/session.service";

@Component({
    selector: 'profil',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, SpinnerComponent]
})
export class ProfileComponent implements OnInit {

    contentReady = signal(true); // TODO Laden der Mannschaftslisten wird nicht angezeigt.
    userProfile: Rest.UserProfileJson | undefined;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private profileService: ProfileService,
        private navigationRouterService: NavigationRouterService) {
    }
    
    ngOnInit() {
        this.profileService.findProfile(this.sessionService.getNickname()).subscribe({
            next: (profile) => {
                this.userProfile = profile;
                console.log('Profile: ', profile);
            },
            error: (error) => {
                console.error('Error: ', error);
            },
            complete: () => {
                this.contentReady.set(true);
            }
        });
    }

}