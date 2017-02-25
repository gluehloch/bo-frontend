import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { BetofficeService } from '../betoffice.service';

import { USERROLE } from '../user-role.enum';

export class Login {
  readonly nickname: string;
  readonly password: string;

  constructor(nickname: string, password: string) {
    this.nickname = nickname;
    this.password = password;
  }
}

export class Logout {
  nickname: string;
  token: string;
}

export class Authentication {

  private _securityToken: Rest.SecurityTokenJson; 

  set securityToken(securityToken: Rest.SecurityTokenJson) {
    this._securityToken = securityToken;
  }
  
  get securityToken() {
    return this._securityToken;
  }

  // --------------------------------------------------------------------------

  private _authenticationTries :number = 0;

  get authenticationTries() {
    return this.authenticationTries;
  }

  addLoginAttempt() {
    this._authenticationTries++;
  }

  // --------------------------------------------------------------------------

  isAuthenticated() {
    return (this._securityToken && this._securityToken.token != 'no_authorization');
  }

  isAdmin() {
    if (this._securityToken && this._securityToken.role) {
        return this._securityToken.role === 'ADMIN'
    } else {
        return false;
    }
  }

  getUserRole() {
    if (this._securityToken) {
      switch (this._securityToken.role) {
        case 'TIPPER':
          return USERROLE.TIPPER;
        case 'ADMIN':
          return USERROLE.ADMIN;
        case 'SEASON_ADMIN':
          return USERROLE.SEASON_ADMIN;
        default:
          return USERROLE.UNKNOWN;
      }
    }
    return USERROLE.UNKNOWN;
  }
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

  logout(logout: Logout): void {
    let response = this.http.post(this.rootUrl + "logout", logout, this.options);

    response.map((r: Response) => r.json())
            .catch(this.handleError);
  }

}
