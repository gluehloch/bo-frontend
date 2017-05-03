import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';

import { AuthenticationService } from './authentication.service';

export class Authentication {

  nickname: string = 'Nickname';
  password: string = 'Password';
 
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

  set authenticationTries(num: number) {
    this._authenticationTries = num;
  }

  // --------------------------------------------------------------------------

  private _authenticated: boolean = false;

  get authenticated() {
    return this._authenticated;
  }

  set authenticated(loggedIn: boolean) {
    this._authenticated = loggedIn;
  }

  // --------------------------------------------------------------------------

  private _admin: boolean = false;

  get admin() {
    return this._admin;
  }

  set admin(admin: boolean) {
    this._admin = admin;
  }

  // --------------------------------------------------------------------------

  getUserRole() {
    if (this.securityToken) {
      switch (this.securityToken.role) {
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
  moduleId: module.id,
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
      this.authentication.securityToken = null; 
    }

    let loggedIn: boolean = (this.authentication.securityToken && this.authentication.securityToken.token != 'no_authorization');
    this.authentication.authenticated = loggedIn;
  }

  login(nickname) {
    let login = {
      nickname: this.authentication.nickname,
      password: this.authentication.password
    };

    this.authenticationService.login(login)
                              .subscribe((securityToken: Rest.SecurityTokenJson) => {
      this.authentication.authenticationTries = this.authentication.authenticationTries + 1;
      if (securityToken.token == 'no_authorization') {
        console.info('Login was not successful');
        this.authentication.securityToken = null;
        this.authentication.authenticated = false;
      } else {
        console.info('Login success!');
        this.authentication.securityToken = securityToken;
        this.authentication.authenticated = true;

        if (this.authentication.authenticated
            && this.authentication.securityToken
            && this.authentication.securityToken.role) {
           this.authentication.admin = this.authentication.securityToken.role === 'ADMIN';
           // TODO TOKEN setzen???
        } else {
          this.authentication.admin = false;
        }
      }
      this.cookieService.putObject('betofficeCookie2', this.authentication);
    });
  }

  logout() {
    if (this.authentication.securityToken) {
      let logout = {
        nickname:  this.authentication.securityToken.nickname,
        token: this.authentication.securityToken.token
      };

      this.authenticationService.logout(logout)
                                .subscribe(() => console.debug("Service-Logout."));

      this.authentication.authenticationTries = 0;
      this.authentication.securityToken = null;
      this.authentication.admin = false;
      this.authentication.authenticated = false;
      this.cookieService.remove('betofficeCookie2');

      console.info('Logout successful.');
    }
  }

  get diagnostic() {
    return JSON.stringify(this.authentication);
  }

}
