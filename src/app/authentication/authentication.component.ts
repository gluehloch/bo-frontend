import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';

import { AuthenticationService } from './authentication.service';

export class Authentication {

  nickname: string;
  password: string;

  authenticated: boolean;
 
  // --------------------------------------------------------------------------

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
    return this._authenticationTries;
  }

  addLoginAttempt() {
    this._authenticationTries++;
  }

  // --------------------------------------------------------------------------

  setAuthenticated() {
    this.authenticated = (this._securityToken && this._securityToken.token != 'no_authorization');
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

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  authentication: Authentication;

  constructor(private cookieService: CookieService, private authenticationService: AuthenticationService) {
    this.authentication = new Authentication();
    this.authentication.securityToken = null;
  }

  ngOnInit() {
    let betofficeCookie: any = this.cookieService.getObject('betofficeCookie2');
    if (betofficeCookie && <Authentication>betofficeCookie) {
      this.authentication = betofficeCookie;
    } else {
      this.authentication = new Authentication();
      this.authentication.securityToken = null; 
    }

    this.authentication.setAuthenticated;
  }

  login(nickname) {
    let login = {
      nickname: this.authentication.nickname,
      password: this.authentication.password
    };

    this.authenticationService.login(login)
                              .subscribe((securityToken: Rest.SecurityTokenJson) => {
      this.authentication.addLoginAttempt;
      if (securityToken.token == 'no_authorization') {
        console.info('Login was not successful');
        this.authentication.securityToken = null;
      } else {
        console.info('Login success!');
        this.authentication.securityToken = securityToken;
      }
      this.cookieService.putObject('betofficeCookie2', this.authentication);

      this.authentication.setAuthenticated;
    });
  }

  logout() {
    let logout = {
      nickname:  this.authentication.securityToken.nickname,
      token: this.authentication.securityToken.token
    };
    this.authenticationService.logout(logout);
    this.authentication.securityToken = null;
  }

}
