import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { NavigationRouterService } from "../navigationrouter.service";
import { AuthenticationWarningComponent } from "../authenticationwarning/authenticationwarning.component";

import { ProfileService } from "./profile.service";
import { SessionService } from "../session/session.service";

@Component({
    selector: 'profil',
    templateUrl: './profile-confirm.component.html',
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, SpinnerComponent, AuthenticationWarningComponent]
})
export class ProfileConfirmComponent implements OnInit {

    contentReady = signal(false);
    userProfile: Rest.UserProfileJson | undefined;
    confirmationToken: string | undefined;
    error: any | undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private sessionService: SessionService,
        private profileService: ProfileService,
        private navigationRouterService: NavigationRouterService) {
    }
    
    ngOnInit() {
        this.confirmationToken = this.route.snapshot.paramMap.get('confirmationToken') || undefined;
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

    confirmUpdateProfile(): void {
        this.contentReady.set(false);
        if (this.userProfile && this.confirmationToken) {
            this.profileService.confirmUupdateProfile(this.userProfile.nickname, this.confirmationToken).subscribe({
                next: (profile) => {
                    console.log('Profile updated: ', profile);
                    this.router.navigate(['/profile']);
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
        this.contentReady.set(false);
        if (this.userProfile) {
            this.profileService.abortUpdateProfile(this.userProfile?.nickname).subscribe({
                next: (profile) => {
                    console.log('Profile updated: ', profile);
                    this.router.navigate(['/profile']);
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

}
