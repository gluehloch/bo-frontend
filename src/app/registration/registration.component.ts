import { Component, OnInit, Output, Input } from '@angular/core';
import { NavigationRouterService } from '../navigationrouter.service';

import { RegistrationService, RegistrationJson } from './registration.service';

class InputField {
    name: string;
    value: string;
    message: string;
    invalid = true;
    valid = false;

}

@Component({
    selector: 'app-input',
    template: `
<div class="form-group">
    <label for="name" class="sr-only"
        ng-class="{'has-warning': invalid}">Name</label>
    <input type="text" id="name" name="name" class="form-control" placeholder="Name" required
        [(ngModel)]="value"
        [class.is-invalid]="invalid"
        [class.is-valid]="valid"/>
    <div class="invalid-feedback">
        {{message}}
    </div>
</div>`
})
export class InputComponent {

    @Input()
    name: string;
    @Output()
    value: string;
    @Input()
    message: string;
    @Input()
    invalid = false;
    @Input()
    valid = true;

}

class RegistrationModel {

    name: InputField;

    /*
    name: string;
    nameMessage: string;
    nameInvalid = false;
    nameValid = false;
    */

    firstname: string;
    firstnameMessage: string;
    firstnameInvalid = false;

    nickname: string;
    nicknameMessage: string;
    nicknameInvalid = false;

    password: string;
    passwordMessage: string;
    password2: string;
    passwordInvalid = false;

    email: string;
    emailMessage: string;
    emailInvalid = false;

    community: string;
    communityMessage: string;
    communityInvalid = false;

    acceptEmail = false;
    acceptEmailInvalid = false;

    acceptCookie = false;
    acceptCookieInvalid = false;

    constructor() {
        this.name = new InputField();
    }

    setNameMessage(message: string, invalid: boolean) {
        this.name.invalid = invalid;
        this.name.message = message;
    }

    setFirstnameMessage(message: string, invalid: boolean) {
        this.firstnameMessage = message;
        this.firstnameInvalid = invalid;
    }

    setNicknameMessage(message: string, invalid: boolean) {
        this.nicknameMessage = message;
        this.nicknameInvalid = invalid;
    }

    setPasswordMessage(message: string, invalid: boolean) {
        this.passwordMessage = message;
        this.passwordInvalid = invalid;
    }

    setEmailMessage(message: string, invalid: boolean) {
        this.emailMessage = message;
        this.emailInvalid = invalid;
    }

    setCommunityMessage(message: string, invalid: boolean) {
        this.communityMessage = message;
        this.communityInvalid = invalid;
    }

    setAcceptCookieMessage(invalid: boolean) {
        this.acceptCookieInvalid = invalid;
    }

    setAcceptEmailMessage(invalid: boolean) {
        this.acceptEmailInvalid = invalid;
    }

    isInvalid() {
        return this.name.invalid
            || this.nicknameInvalid
            || this.firstnameInvalid
            || this.passwordInvalid
            || this.acceptCookieInvalid
            || this.acceptEmailInvalid
            || this.communityInvalid
            || this.emailInvalid;
    }

    reset() {
        this.name.value = '';

        this.firstname = '';
        this.nickname = '';
        this.password = '';
        this.password2 = '';
        this.community = '';
        this.email = '';
    }

    resetMessages() {
        this.name.message = '';

        this.firstnameMessage = '';
        this.nicknameMessage = '';
        this.passwordMessage = '';
        this.communityMessage = '';
        this.emailMessage = '';
    }

    resetInvalid() {
        this.name.valid = false;
        this.name.invalid = false;

        this.nicknameInvalid = false;
        this.firstnameInvalid = false;
        this.passwordInvalid = false;
        this.acceptCookieInvalid = false;
        this.acceptEmailInvalid = false;
        this.communityInvalid = false;
        this.emailInvalid = false;
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

        if (!this.registrationModel.nickname) {
            this.registrationModel.setNicknameMessage('Der Nickname fehlt.', true);
        } else {
            this.registrationModel.setNicknameMessage(null, false);
        }

        if (!this.registrationModel.password) {
            this.registrationModel.setPasswordMessage('Das Passwort fehlt.', true);
        } else if (this.registrationModel.password2) {
            this.registrationModel.setPasswordMessage('Das Passwort fehlt.', true);
        } else if (this.registrationModel.password !== this.registrationModel.password2) {
            this.registrationModel.setPasswordMessage('Die Passwörter sind nicht gleich.', true);
            console.log('Form validation: Different passwords.');
        }

        if (!this.registrationModel.name) {
            this.registrationModel.setNameMessage('Der Name fehlt.', true);
        }

        if (!this.registrationModel.firstname) {
            this.registrationModel.setFirstnameMessage('Der Vorname fehlt.', true);
        }

        if (!this.registrationModel.email) {
            this.registrationModel.setEmailMessage('Die Email Adresse fehlt.', true);
        }

        if (!this.registrationModel.community) {
            this.registrationModel.setCommunityMessage('Deine Wunsch Community fehlt.', true);
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
            registration.email = this.registrationModel.email;
            registration.firstname = this.registrationModel.firstname;
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
