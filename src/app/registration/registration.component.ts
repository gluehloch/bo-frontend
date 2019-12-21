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

    setNameMessage(message: string) {
        this.name.message = message;
        this.name.invalid = true;
        this.name.valid = false;
    }

    setNameOk() {
        this.name.message = null;
        this.name.invalid = false;
        this.name.valid = true;
    }

    setFirstnameMessage(message: string) {
        this.firstname.message = message;
        this.firstname.invalid = true;
        this.firstname.valid = false;
    }

    setFirstnameOk() {
        this.firstname.message = null;
        this.firstname.invalid = false;
        this.firstname.valid = true;
    }

    setNicknameMessage(message: string) {
        this.nickname.message = message;
        this.nickname.invalid = true;
        this.nickname.valid = false;
    }

    setNicknameOk() {
        this.nickname.message = null;
        this.nickname.invalid = false;
        this.nickname.valid = true;
    }

    setPasswordMessage(message: string) {
        this.password.message = message;
        this.password.invalid = true;
        this.password.valid = false;
    }

    setPasswordOk() {
        this.password.message = null;
        this.password.invalid = false;
        this.password.valid = true;
    }

    setPassword2Message(message: string) {
        this.password2.message = message;
        this.password2.invalid = true;
        this.password2.valid = false;
    }

    setPassword2Ok() {
        this.password2.message = null;
        this.password2.invalid = false;
        this.password2.valid = true;
    }

    setEmailMessage(message: string) {
        this.email.message = message;
        this.email.invalid = true;
        this.email.valid = false;
    }

    setEmailOk() {
        this.email.message = null;
        this.email.invalid = false;
        this.email.valid = true;
    }

    setCommunityMessage(message: string) {
        this.community.message = message;
        this.community.invalid = true;
        this.community.valid = false;
    }

    setCommunityOk() {
        this.community.message = null;
        this.community.invalid = false;
        this.community.valid = true;
    }

    setMissingAcceptCookie(invalid: boolean) {
        this.acceptCookieInvalid = invalid;
    }

    setMissingAcceptEmail(invalid: boolean) {
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
        this.password2.valid = false;
        this.password2.invalid = false;

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

    validateNickname() {
        if (this.registrationModel.nickname.value) {
            this.registrationModel.setNicknameOk();
        } else {
            this.registrationModel.setNicknameMessage('Der Nickname fehlt.');
        }
    }

    validatePassword() {
        if (!this.registrationModel.password.value) {
            this.registrationModel.setPasswordMessage('Das Passwort fehlt.');
        } else if (!this.registrationModel.password2.value) {
            this.registrationModel.setPassword2Message('Die Passwort Wiederholung fehlt.');
        } else if (this.registrationModel.password.value !== this.registrationModel.password2.value) {
            this.registrationModel.setPassword2Message('Die Passwörter sind nicht gleich.');
            console.log('Form validation: Different passwords.');
        } else {
            this.registrationModel.setPasswordOk();
            this.registrationModel.setPassword2Ok();
        }
    }

    validateName() {
        if (this.registrationModel.name.value) {
            this.registrationModel.setNameOk();
        } else {
            this.registrationModel.setNameMessage('Der Name fehlt.');
        }
    }

    validateFirstname() {
        if (this.registrationModel.firstname.value) {
            this.registrationModel.setFirstnameOk();
        } else {
            this.registrationModel.setFirstnameMessage('Der Vorname fehlt.');
        }
    }

    validateEmail() {
        if (this.registrationModel.email.value) {
            this.registrationModel.setEmailOk();
        } else {
            this.registrationModel.setEmailMessage('Die Email Adresse fehlt.');
        }
    }

    validateCommunity() {
        if (this.registrationModel.community.value) {
            this.registrationModel.setCommunityOk();
        } else {
            this.registrationModel.setCommunityMessage('Deine Wunsch Community fehlt.');
        }

    }

    validateAcceptCookie() {
        this.registrationModel.setMissingAcceptCookie(!this.registrationModel.acceptCookie);
    }

    validateAcceptEmail() {
        this.registrationModel.setMissingAcceptEmail(!this.registrationModel.acceptEmail);
    }

    validate() {
        this.registrationModel.resetMessages();

        this.validateNickname();
        this.validatePassword();
        this.validateName();
        this.validateFirstname();
        this.validateEmail();
        this.validateCommunity();
        this.validateAcceptCookie();
        this.validateAcceptEmail();
    }

    reset() {
        this.registrationModel.reset();
        this.registrationModel.resetMessages();
        this.registrationModel.resetInvalid();
    }

    startRegistration() {
        this.validate();
        const successfulValidation = !this.registrationModel.isInvalid();

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
                    if (data.validationCode === RegistrationJson.OK) {
                        console.log('Registration request is stored: ' + data);
                    }
                });
        } else {
            console.log('Form is not valid.');
        }
    }

}
