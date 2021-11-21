import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

export class ValidationCode {

    static readonly OK = new ValidationCode(1, 'OK');
    static readonly KNOWN_DATA = new ValidationCode(1000, 'KNOWN_DATA');
    static readonly KNOWN_NICKNAME = new ValidationCode(1001, 'KNOWN_NICKNAME');
    static readonly KNOWN_MAILADDRESS = new ValidationCode(1002, 'KNOWN_MAILADDRESS');
    static readonly UNKNOWN_APPLICATION = new ValidationCode(1003, 'UNKNOWN_APPLICATION');
    static readonly MISSING_ACCEPT_EMAIL = new ValidationCode(1004, 'MISSING_ACCEPT_EMAIL');
    static readonly MISSING_ACCEPT_COOKIE = new ValidationCode(1005, 'MISSING_ACCEPT_COOKIE');
    static readonly UNKNOWN_TOKEN = new ValidationCode(1006, 'UNKNOWN_TOKEN');
    static readonly PASSWORD_TOO_SHORT = new ValidationCode(1007, 'PASSWORD_TOO_SHORT');
    static readonly NICKNAME_IS_EMPTY = new ValidationCode(1008, 'NICKNAME_IS_EMPTY');
    static readonly EMAIL_IS_EMPTY = new ValidationCode(1009, 'EMAIL_IS_EMPTY');
    static readonly FIRSTNAME_IS_EMPTY = new ValidationCode(1010, 'FIRSTNAME_IS_EMPTY');
    static readonly EMAIL_IS_NOT_VALID = new ValidationCode(1011, 'EMAIL_IS_NOT_VALID');
    static readonly EMAIL_IS_RESERVED = new ValidationCode(1012, 'EMAIL_IS_RESERVED');
    static readonly ILLEGAL_ARGUMENTS = new ValidationCode(2000, 'ILLEGAL_ARGUMENTS');

    static readonly VALIDATON_CODES = [
        ValidationCode.OK,
        ValidationCode.KNOWN_DATA,
        ValidationCode.KNOWN_NICKNAME,
        ValidationCode.KNOWN_MAILADDRESS,
        ValidationCode.UNKNOWN_APPLICATION,
        ValidationCode.MISSING_ACCEPT_EMAIL,
        ValidationCode.MISSING_ACCEPT_COOKIE,
        ValidationCode.UNKNOWN_TOKEN,
        ValidationCode.PASSWORD_TOO_SHORT,
        ValidationCode.NICKNAME_IS_EMPTY,
        ValidationCode.EMAIL_IS_EMPTY,
        ValidationCode.FIRSTNAME_IS_EMPTY,
        ValidationCode.EMAIL_IS_NOT_VALID,
        ValidationCode.EMAIL_IS_RESERVED,
        ValidationCode.ILLEGAL_ARGUMENTS
    ];

    constructor(public code: number, public name: string) {
    }

}

export class RegistrationJson {

    nickname: string;
    name: string;
    firstname: string;
    password: string;
    email: string;
    supplement: string;
    acceptMail = false;
    acceptCookie = false;
    applicationName = '';
    validationCodes: string[];

}

@Injectable()
export class RegistrationService extends BetofficeService {

    protected registerUrl = environment.registerserviceUrl;

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
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
