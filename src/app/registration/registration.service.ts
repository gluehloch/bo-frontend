import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { environment } from 'src/environments/environment';

export class Registration {
    nickname: string;
    password: string;
    email: string;
    emailMessage: string;
    supplement: string;
    acceptEmail = false;
    acceptCookie = false;

}

@Injectable()
export class RegistrationService extends BetofficeService {

    protected registerUrl = environment.registerserviceUrl;

    constructor(http: HttpClient) {
        super(http);
    }

    register(registrationModel): Observable<string> {
        return this.http.post<string>(this.registerUrl, registrationModel);
    }

    login(): Observable<Rest.SecurityTokenJson> {
        return null;
        // return this.http.post<Rest.SecurityTokenJson>(this.rootUrl + "login", login, { headers: this.createHeader() });
    }

    logout(): Observable<Rest.SecurityTokenJson> {
        return null;
        // return this.http.post<Rest.SecurityTokenJson>(this.rootUrl + "logout", logout, { headers: this.createHeader() });
    }

}
