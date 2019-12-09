import { Component, OnInit, Input } from '@angular/core';
import { NavigationRouterService } from '../navigationrouter.service';

import { RegistrationService, RegistrationJson } from './registration.service';

class InputFieldModel {
    name: string;
    value: string;
    message: string;
    invalid = false;
    valid = false;
}

class RegistrationModel {

    name: InputFieldModel;
    firstname: InputFieldModel;
    nickname: InputFieldModel;
    password: InputFieldModel;
    password2: InputFieldModel;
    email: InputFieldModel;
    community: InputFieldModel;

    acceptEmail = false;
    acceptEmailInvalid = false;
    acceptCookie = false;
    acceptCookieInvalid = false;

    constructor() {
        this.name = new InputFieldModel();
        this.firstname = new InputFieldModel();
        this.nickname = new InputFieldModel();
        this.password = new InputFieldModel();
        this.password2 = new InputFieldModel();
        this.email = new InputFieldModel();
        this.community = new InputFieldModel();
    }

    setNameMessage(message: string, invalid: boolean, valid: boolean) {
        this.name.message = message;
        this.name.invalid = invalid;
        this.name.valid = valid;
    }

    setFirstnameMessage(message: string, invalid: boolean, valid: boolean) {
        this.firstname.message = message;
        this.firstname.invalid = invalid;
        this.firstname.valid = valid;
    }

    setNicknameMessage(message: string, invalid: boolean, valid: boolean) {
        this.nickname.message = message;
        this.nickname.invalid = invalid;
        this.nickname.valid = valid;
    }

    setPasswordMessage(message: string, invalid: boolean, valid: boolean) {
        this.password.message = message;
        this.password.invalid = invalid;
        this.password.valid = valid;
    }

    setEmailMessage(message: string, invalid: boolean, valid: boolean) {
        this.email.message = message;
        this.email.invalid = invalid;
        this.email.valid = valid;
    }

    setCommunityMessage(message: string, invalid: boolean, valid: boolean) {
        this.community.message = message;
        this.community.invalid = invalid;
        this.community.valid = valid;
    }

    setAcceptCookieMessage(invalid: boolean) {
        this.acceptCookieInvalid = invalid;
    }

    setAcceptEmailMessage(invalid: boolean) {
        this.acceptEmailInvalid = invalid;
    }

    isInvalid() {
        return this.name.invalid
            || this.nickname.invalid
            || this.firstname.invalid
            || this.password.invalid
            || this.community.invalid
            || this.email.invalid
            || this.acceptCookieInvalid
            || this.acceptEmailInvalid;
    }

    reset() {
        this.name.value = '';
        this.firstname.value = '';
        this.nickname.value = '';
        this.password.value = '';
        this.password2.value = '';
        this.community.value = '';
        this.email.value = '';
    }

    resetMessages() {
        this.name.message = '';
        this.firstname.message = '';
        this.nickname.message = '';
        this.password.message = '';
        this.community.message = '';
        this.email.message = '';
    }

    resetInvalid() {
        this.name.valid = false;
        this.name.invalid = false;

        this.nickname.valid = false;
        this.nickname.invalid = false;

        this.firstname.valid = false;
        this.firstname.invalid = false;

        this.password.valid = false;
        this.password.invalid = false;

        this.community.valid = false;
        this.community.invalid = false;

        this.email.valid = false;
        this.email.invalid = false;

        this.acceptEmailInvalid = false;
        this.acceptCookieInvalid = false;
    }
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

        if (!this.registrationModel.nickname.value) {
            this.registrationModel.setNicknameMessage('Der Nickname fehlt.', true, false);
        } else {
            this.registrationModel.setNicknameMessage(null, false, true);
        }

        if (!this.registrationModel.password.value) {
            this.registrationModel.setPasswordMessage('Das Passwort fehlt.', true, false);
        } else if (this.registrationModel.password2.value) {
            this.registrationModel.setPasswordMessage('Das Passwort fehlt.', true, true);
        } else if (this.registrationModel.password.value !== this.registrationModel.password2.value) {
            this.registrationModel.setPasswordMessage('Die Passwörter sind nicht gleich.', true, false);
            console.log('Form validation: Different passwords.');
        }

        if (!this.registrationModel.name.value) {
            this.registrationModel.setNameMessage('Der Name fehlt.', true, false);
        }

        if (!this.registrationModel.firstname.value) {
            this.registrationModel.setFirstnameMessage('Der Vorname fehlt.', true, false);
        }

        if (!this.registrationModel.email.value) {
            this.registrationModel.setEmailMessage('Die Email Adresse fehlt.', true, false);
        }

        if (!this.registrationModel.community.value) {
            this.registrationModel.setCommunityMessage('Deine Wunsch Community fehlt.', true, false);
        }

        if (!this.registrationModel.acceptCookie) {
            this.registrationModel.setAcceptCookieMessage(true);
        }

        if (!this.registrationModel.acceptEmail) {
            this.registrationModel.setAcceptEmailMessage(true);
        }

        return this.registrationModel.isInvalid();
    }

    reset() {
        this.registrationModel.reset();
        this.registrationModel.resetMessages();
        this.registrationModel.resetInvalid();
    }

    startRegistration() {
        const successfulValidation = this.validate();

        if (successfulValidation) {
            const registration = new RegistrationJson();
            registration.name = this.registrationModel.name.value;
            registration.acceptCookie = this.registrationModel.acceptCookie;
            registration.acceptMail = this.registrationModel.acceptEmail;
            registration.applicationName = 'tippdiekistebier.de';
            registration.email = this.registrationModel.email.value;
            registration.firstname = this.registrationModel.firstname.value;
            registration.nickname = this.registrationModel.nickname.value;
            registration.password = this.registrationModel.password.value;
            registration.supplement = `{'community': '${this.registrationModel.community.value}'}`;

            this.registrationService.register(registration)
                .subscribe((data: RegistrationJson) => {
                    console.log(data);
                });
        } else {
            console.log('Form is not valid.');
        }
    }

}
