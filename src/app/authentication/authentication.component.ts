import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';

import { AuthenticationService, Authentication } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  authentication: Authentication;

  constructor(private cookieService: CookieService, private authenticationService: AuthenticationService) {
    this.authentication = new Authentication(undefined, USERROLE.UNKNOWN);
  }

  ngOnInit() {
    let betofficeCookie: any = this.cookieService.getObject('betofficeCookie');
    if (betofficeCookie && <Authentication>betofficeCookie) {
      this.authentication = betofficeCookie;
    } else {
      this.authentication = new Authentication('unknown', USERROLE.UNKNOWN);
      this.authentication.token = 'no_authorization'; 
    }
  }

  login(nickname: string, password: string) {
    this.authenticationService.login({nickname:  nickname, password: password})
                              .subscribe((securityToken: Rest.SecurityTokenJson) => {
      if (securityToken.token == 'no_authorization') {

      } else {

      }
    });
  }

}
