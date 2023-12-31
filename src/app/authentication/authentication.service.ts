import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

export interface Login {
    nickname: string;
    password: string;
}

export interface Logout {
    nickname: string;
    token: string;
}

@Injectable()
export class AuthenticationService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    login(login: Login): Observable<Rest.SecurityTokenJson> {
        return this.http.post<Rest.SecurityTokenJson>(this.authenticationUrl + "login", login);
    }

    logout(logout: Logout): Observable<Rest.SecurityTokenJson> {
        return this.http.post<Rest.SecurityTokenJson>(this.authenticationUrl + "logout", logout);
    }

}
