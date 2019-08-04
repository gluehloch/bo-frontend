import { Component, OnInit } from '@angular/core';
import { NavigationRouterService } from '../navigationrouter.service';

class RegistrationModel {
    nickname: string;
    password: string;
    password2: string;
    community: string;
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    wasValidated = 'not-validated';
    registrationModel: RegistrationModel;

    constructor(private navigationRouterService: NavigationRouterService) {
    }

    ngOnInit() {
        this.init();
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

    init() {
        this.registrationModel = new RegistrationModel();
    }

    startRegistration() {
        this.wasValidated = 'was-validated';
        // this.registrationModel.nickname
    }

}
