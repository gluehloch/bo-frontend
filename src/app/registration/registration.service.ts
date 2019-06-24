import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class RegistrationService extends BetofficeService {

    constructor(http: HttpClient) {
        super(http);
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