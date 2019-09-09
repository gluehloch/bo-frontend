import { Component, OnInit } from '@angular/core';
import { NavigationRouterService } from '../navigationrouter.service';

import { RegistrationService, RegistrationJson } from './registration.service';

class RegistrationModel {
    name: string;
    nameMessage: string;
    firstname: string;
    firstnameMessage: string;
    nickname: string;
    nicknameMessage: string;
    password: string;
    passwordMessage: string;
    password2: string;
    email: string;
    emailMessage: string;
    community: string;
    communityMessage: string;
    acceptEmail = false;
    acceptCookie = false;

    reset() {
        this.name = '';
        this.firstname = '';
        this.nickname = '';
        this.password = '';
        this.password2 = '';
        this.community = '';
        this.email = '';
    }

    resetMessages() {
        this.nameMessage = '';
        this.firstnameMessage = '';
        this.nicknameMessage = '';
        this.passwordMessage = '';
        this.communityMessage = '';
        this.emailMessage = '';
    }
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    wasValidated = 'not-validated';
    registrationModel: RegistrationModel;

    constructor(private navigationRouterService: NavigationRouterService,
        private registrationService: RegistrationService) {
    }

    ngOnInit() {
        this.init();
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

    init() {
        this.registrationModel = new RegistrationModel();
    }

    validate(): boolean {
        this.registrationModel.resetMessages();
        let successfulValidation = true;

        if (!this.registrationModel.nickname) {
            this.registrationModel.nicknameMessage = 'Der Nickname fehlt.';
            successfulValidation = false;
        }

        if (!this.registrationModel.password) {
            this.registrationModel.passwordMessage = 'Das Passwort fehlt.';
            successfulValidation = false;
        } else if (this.registrationModel.password !== this.registrationModel.password2) {
            this.registrationModel.passwordMessage = 'Die Passwörter sind nicht gleich.';
            successfulValidation = false;
            console.log('Form validation: Different passwords.');
        }

        if (!this.registrationModel.name) {
            this.registrationModel.nameMessage = 'Der Name fehlt.';
            successfulValidation = false;
        }

        if (!this.registrationModel.firstname) {
            this.registrationModel.firstnameMessage = 'Der Vorname fehlt.';
            successfulValidation = false;
        }

        if (!this.registrationModel.email) {
            this.registrationModel.emailMessage = 'Die Email Adresse fehlt.';
            successfulValidation = false;
        }

        if (!this.registrationModel.community) {
            this.registrationModel.communityMessage = 'Deine Wunsch Community fehlt.';
            successfulValidation = false;
        }

        if (!this.registrationModel.acceptCookie || !this.registrationModel.acceptEmail) {
            successfulValidation = false;
        }

        return successfulValidation;
    }

    reset() {
        this.registrationModel.reset();
        this.registrationModel.resetMessages();
        this.wasValidated = '';
    }

    startRegistration() {
        const successfulValidation = this.validate();
        this.wasValidated = 'was-validated';

        if (successfulValidation) {
            const registration = new RegistrationJson();
            registration.acceptCookie = this.registrationModel.acceptCookie;
            registration.acceptMail = this.registrationModel.acceptEmail;
            registration.applicationName = 'tippdiekistebier.de';
            registration.email = this.registrationModel.email;
            registration.firstname = this.registrationModel.firstname;
            registration.name = this.registrationModel.name;
            registration.nickname = this.registrationModel.nickname;
            registration.password = this.registrationModel.password;
            registration.supplement = `{'community': '${this.registrationModel.community}'}`;

            this.registrationService.register(registration)
                .subscribe((data: RegistrationJson) => {
                    console.log(data);
                });
        } else {
            console.log('Form is not valid.');
        }
    }

}
