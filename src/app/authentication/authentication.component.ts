import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { AuthenticationService } from './authentication.service';
import { NavigationRouterService } from '../navigationrouter.service';

import { USERROLE } from '../user-role.enum';

import { environment } from '../../environments/environment';

class AuthenticationModel {

    nickname: string;
    password: string;
    lastlogin: string;

    // --------------------------------------------------------------------------

    private _token: string;

    set token(token: string) {
        this._token = token;
    }

    get token() {
        return this._token;
    }

    // --------------------------------------------------------------------------

    private _authenticationTries = 0;

    get authenticationTries() {
        return this._authenticationTries;
    }

    set authenticationTries(num: number) {
        this._authenticationTries = num;
    }

    // --------------------------------------------------------------------------

    private _authenticated = false;

    get authenticated() {
        return this._authenticated;
    }

    set authenticated(loggedIn: boolean) {
        this._authenticated = loggedIn;
    }

    // --------------------------------------------------------------------------

    private _admin = false;

    get admin() {
        return this._admin;
    }

    set admin(admin: boolean) {
        this._admin = admin;
    }

    // --------------------------------------------------------------------------

    clear() {
        this.authenticated = false;
        this.nickname = null;
        this.password = null;
        this.token = null;
        this.admin = false;
        this.authenticationTries = 0;
    }

}

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    dateTimeFormat = environment.dateTimeFormat;
    authenticationModel: AuthenticationModel;

    constructor(
        private cookieService: CookieService,
        private authenticationService: AuthenticationService,
        private navigationRouterService: NavigationRouterService) {

        this.authenticationModel = new AuthenticationModel();
        this.authenticationModel.token = null;
    }

    ngOnInit() {
        this.init();
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

    init() {
        if (this.authenticationService.isAuthorized()) {
            const securityToken = this.authenticationService.readCredentials();
            this.authenticationModel.authenticated = true;
            this.authenticationModel.nickname = securityToken.nickname;
            this.authenticationModel.token = securityToken.token;
            this.authenticationModel.lastlogin = securityToken.loginTime;
            this.authenticationModel.admin = (this.authenticationService.getUserRole() === USERROLE.ADMIN);
        } else {
            this.authenticationModel.clear();
        }
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
                    this.authenticationService.clearCredentials();
                } else {
                    console.log('Login success!');
                    this.authenticationService.storeCredentials(securityToken);
                    this.navigationRouterService.login();

                    this.authenticationModel.authenticated = true;
                    this.authenticationModel.nickname = securityToken.nickname;
                    this.authenticationModel.token = securityToken.token;
                    this.authenticationModel.lastlogin = securityToken.loginTime;
                    this.authenticationModel.admin = (this.authenticationService.getUserRole() === USERROLE.ADMIN);                    
                }
            });
    }

    logout() {
        this.authenticationModel.authenticationTries = 0;

        if (this.authenticationService.isAuthorized()) {
            const logout = {
                nickname: this.authenticationModel.nickname,
                token: this.authenticationModel.token
            };

            this.authenticationService.logout(logout)
                .subscribe((securityToken: Rest.SecurityTokenJson) => {
                    this.authenticationService.clearCredentials();
                    this.navigationRouterService.logout();
                    this.authenticationModel.clear();
                    console.log('Logout successful.');
                });
        }
    }

    get diagnostic() {
        return JSON.stringify(this.authenticationModel);
    }

}
