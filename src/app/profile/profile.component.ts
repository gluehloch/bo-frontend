import { Component, OnInit, Signal, signal } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

import { Router } from "@angular/router";

import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { NavigationRouterService } from "../navigationrouter.service";
import { AuthenticationWarningComponent } from "../authenticationwarning/authenticationwarning.component";

import { ProfileService } from "./profile.service";
import { SessionService } from "../session/session.service";
import { ModalService } from "../modal/modal.service";

@Component({
    selector: 'profil',
    templateUrl: './profile.component.html',
    imports: [FormsModule, SpinnerComponent, AuthenticationWarningComponent],
    standalone: true,
})
export class ProfileComponent implements OnInit {

    loading = signal(true);
    newMailRequested = signal(false);
    numberOfResubmits = signal(0);
    userProfile: Rest.UserProfileJson | undefined;
    error: any | undefined;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private profileService: ProfileService,
        private modalService: ModalService,
        private navigationRouterService: NavigationRouterService) {
    }

    private handleError(error: any): void {
        if (error.status === 403) {
            this.modalService.open('AuthenticationWarningComponent', error.status);
        }
    }
    
    ngOnInit() {
        this.profileService.findProfile(this.sessionService.getNickname()).subscribe({
            next: (profile) => {
                this.userProfile = profile;
                if (profile.alternativeMail) {
                    this.newMailRequested.set(true);
                }
            },
            error: (error) => {
                console.error('Error: ', error);
                this.error = error;
                this.handleError(error);
            },
            complete: () => {
                this.loading.set(false);
            }
        });
    }

    updateProfile(form: NgForm): void {
        this.loading.set(true);
        this.error = undefined;
        if (this.userProfile) {
            this.profileService.updateProfile(this.userProfile).subscribe({
                next: (profile) => {
                    console.log('Profile updated: ', profile);
                    this.userProfile = profile;
                    if (profile.alternativeMail) {
                        this.newMailRequested.set(true);
                    }
                },
                error: (error) => {
                    console.error('Error: ', error);
                    this.error = error;
                },
                complete: () => {
                    form.form.markAsPristine();
                    this.loading.set(false);
                },
            });
        }
    }

    abort(): void {
        this.router.navigate(['./home']);
    }

    submitConfirmationMail(): void {
        this.loading.set(true);
        this.error = undefined;
        this.profileService.resubmitConfirmationMail(this.sessionService.getNickname()).subscribe({
            next: (userProfile) => {
                console.log('Mail sent: ', userProfile);
                this.numberOfResubmits.set(this.numberOfResubmits() + 1);
            },
            error: (error) => {
                console.error('Error: ', error);
                this.error = error;
            },
            complete: () => {
                this.loading.set(false);
            }
        });
    }

}