import { Component, OnInit } from '@angular/core';
import { NavigationRouterService } from '../navigationrouter.service';

import { RegistrationService } from './registration.service';

class RegistrationModel {
    nickname: string;
    nicknameMessage = 'Der Nickname kann nicht verwendet werden.';
    password: string;
    passwordMessage = 'Das Passwort kann nicht verwendet werden.';
    password2: string;
    email: string;
    emailMessage: string;
    community: string;
    communityMessage: string;

    reset() {
        this.nickname = '';
        this.nicknameMessage = '';
        this.password = '';
        this.passwordMessage = '';
        this.password2 = '';
        this.community = '';
        this.communityMessage = '';
        this.email = '';
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

    validate() {
        if (!this.registrationModel.nickname) {
            this.registrationModel.nicknameMessage = 'Der Nickname fehlt.';
        }

        if (!this.registrationModel.password) {
            this.registrationModel.passwordMessage = 'Das Passwort fehlt.';
        } else if (this.registrationModel.password === this.registrationModel.password2) {
            this.registrationModel.passwordMessage = 'Die Passwörter sind nicht gleich.';
        }

        if (!this.registrationModel.email) {
            this.registrationModel.email = 'Die Email Adresse fehlt.';
        }

        if (!this.registrationModel.community) {
            this.registrationModel.communityMessage = 'Deine Wunsch Community fehlt.';
        }
    }

    reset() {
        this.registrationModel.reset();
        this.wasValidated = '';
    }

    startRegistration() {
        this.validate();
        this.wasValidated = 'was-validated';
        // this.registrationModel.nickname
    }

}
