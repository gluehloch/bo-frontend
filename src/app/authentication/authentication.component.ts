import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { USERROLE } from '../user-role.enum';

import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';
import { FormsModule } from '@angular/forms';
import { NgIf, DatePipe } from '@angular/common';

class AuthenticationModel {

    nickname = '';
    password = '';
    lastlogin = '';
    token = '';
    authenticationTries = 0;
    authenticated = false;
    admin = false;

    clear() {
        this.authenticated = false;
        this.nickname = '';
        this.password = '';
        this.token = '';
        this.admin = false;
        this.authenticationTries = 0;
    }

}

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, DatePipe]
})
export class AuthenticationComponent implements OnInit {

    readonly authenticationUrl = environment.authenticationUrl
    readonly dateTimeFormat = environment.dateTimeFormat;
    authenticationModel: AuthenticationModel;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private authenticationService: AuthenticationService,
        private navigationRouterService: NavigationRouterService) {

        this.authenticationModel = new AuthenticationModel();
        this.authenticationModel.token = '';
    }

    ngOnInit() {
        this.init();
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

    init() {
        if (this.sessionService.isAuthorized()) {
            const securityToken = this.sessionService.readCredentials();
            this.authenticationModel.authenticated = true;
            this.authenticationModel.nickname = securityToken.nickname;
            this.authenticationModel.token = securityToken.token;
            this.authenticationModel.lastlogin = securityToken.loginTime;
            this.authenticationModel.admin = (this.sessionService.getUserRole() === USERROLE.ADMIN);
        } else {
            this.authenticationModel.clear();
        }
    }

    startGoogleIamLogin() {
<<<<<<< HEAD
        // TODO Umgebungsabhängig / Spring Boot für localhost Development
        window.location.href = 'http://localhost:9999/betoffice-boot/authentication/google/login-url';
=======
        // TODO Umgebungsabängig / Spring Boot für localhost Development
        // 'http://localhost:9999/betoffice-boot/authentication/google/login-url'
        window.location.href =  this.authenticationUrl + 'google/login-url';
>>>>>>> c72c9fbd8a71a10224b7c9a29a6fe9caaea10df8
    }

    login() {
        const login = {
            nickname: this.authenticationModel.nickname,
            password: this.authenticationModel.password
        };

        this.authenticationModel.authenticationTries = this.authenticationModel.authenticationTries + 1;

        this.authenticationService.login(login)
            .subscribe((securityToken: Rest.SecurityTokenJson) => {
                if (securityToken.token === 'no_authorization') {
                    console.log('Login was not successful');
                    this.sessionService.clearCredentials();
                } else {
                    console.log('Login success!');
                    this.sessionService.storeCredentials(securityToken);
                    this.navigationRouterService.login();

                    this.authenticationModel.authenticated = true;
                    this.authenticationModel.nickname = securityToken.nickname;
                    this.authenticationModel.token = securityToken.token;
                    this.authenticationModel.lastlogin = securityToken.loginTime;
                    this.authenticationModel.admin = (this.sessionService.getUserRole() === USERROLE.ADMIN);                    

                    if (this.sessionService.redirectUrl) {
                        const url = this.sessionService.redirectUrl || '';
                        this.sessionService.redirectUrl = '';
                        this.router.navigateByUrl(url);
                    }
                }
            });
    }

    logout() {
        this.authenticationModel.authenticationTries = 0;

        if (this.sessionService.isAuthorized()) {
            const logout = {
                nickname: this.authenticationModel.nickname,
                token: this.authenticationModel.token
            };

            this.authenticationService.logout(logout)
                .subscribe({
                    next: (securityToken: Rest.SecurityTokenJson) => {
                        this.sessionService.clearCredentials();
                        this.navigationRouterService.logout();
                        this.authenticationModel.clear();
                        console.log('Logout successful.', securityToken);
                    },
                    error: (errorResponse) => {
                        this.sessionService.clearCredentials();
                        this.navigationRouterService.logout();
                        this.authenticationModel.clear();
                        console.log('Logout not so successful. Server responsed with an error.', errorResponse);
                    }
                });
        }
    }

    get diagnostic() {
        return JSON.stringify(this.authenticationModel);
    }

}
