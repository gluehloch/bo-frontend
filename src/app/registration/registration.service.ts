import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { environment } from 'src/environments/environment';

export class RegistrationJson {

    static readonly OK = 1;
    static readonly KNOWN_DATA = 1000;
    static readonly KNOWN_NICKNAME = 1001;
    static readonly KNOWN_MAILADDRESS = 1002;
    static readonly UNKNOWN_APPLICATION = 1003;
    static readonly MISSING_ACCEPT_EMAIL = 1004;
    static readonly MISSING_ACCEPT_COOKIE = 1005;
    static readonly UNKNOWN_TOKEN = 1006;
    static readonly ILLEGAL_ARGUMENTS = 2000;

    nickname: string;
    name: string;
    firstname: string;
    password: string;
    email: string;
    supplement: string;
    acceptMail = false;
    acceptCookie = false;
    applicationName = '';
    validationCode: number;
}

@Injectable()
export class RegistrationService extends BetofficeService {

    protected registerUrl = environment.registerserviceUrl;

    constructor(http: HttpClient) {
        super(http);
    }

    register(registrationModel: RegistrationJson): Observable<RegistrationJson> {
        return this.http.post<RegistrationJson>(this.registerUrl, registrationModel);
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
