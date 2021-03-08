import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO Was ist das hier?

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { BetofficeService } from '../betoffice.service';

import { USERROLE } from '../user-role.enum';


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

    constructor(http: HttpClient) {
        super(http);
    }

    login(login: Login): Observable<Rest.SecurityTokenJson> {
        return this.http.post<Rest.SecurityTokenJson>(this.rootUrl + "login", login, { headers: this.createHeader() });
    }

    logout(logout: Logout): Observable<Rest.SecurityTokenJson> {
        return this.http.post<Rest.SecurityTokenJson>(this.rootUrl + "logout", logout, { headers: this.createHeader() });
    }

}
