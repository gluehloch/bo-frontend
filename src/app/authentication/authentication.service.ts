import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

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

  constructor(http: Http) {
    super(http);
  }

  login(login: Login): Observable<Rest.SecurityTokenJson> {
    let response = this.http.post(this.rootUrl + "login", login, this.options);
    return response.map((r: Response) => r.json() as Rest.SecurityTokenJson)
                   .catch(this.handleError);
  }

  logout(logout: Logout): Observable<string> {
    let response = this.http.post(this.rootUrl + "logout", logout, this.options);

    return response.map((r: Response) => r.json())
                   .catch(this.handleError);
  }

}
