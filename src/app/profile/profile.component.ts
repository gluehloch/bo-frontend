import { Component, OnInit, Signal, signal } from "@angular/core";
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

    contentReady = signal(false);
    newMailRequested = signal(false);
    userProfile: Rest.UserProfileJson | undefined;
    error: any | undefined;

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
                if (profile.alternativeMail) {
                    this.newMailRequested.set(true);
                }
                console.log('Profile: ', profile);
            },
            error: (error) => {
                console.error('Error: ', error);
                this.error = error;
            },
            complete: () => {
                this.contentReady.set(true);
            }
        });
    }

    updateProfile(): void {
        this.contentReady.set(false);
        this.error = undefined;
        if (this.userProfile) {
            this.profileService.updateProfile(this.userProfile).subscribe({
                next: (profile) => {
                    console.log('Profile updated: ', profile);
                },
                error: (error) => {
                    console.error('Error: ', error);
                    this.error = error;
                },
                complete: () => {
                    this.contentReady.set(true);
                },
            });
        }
    }

    abort(): void {
        console.log('Abort');
    }

    submitConfirmationMail(): void {
        console.log('Submit confirmation mail');
    }

}