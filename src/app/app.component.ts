import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationRouterService } from './navigationrouter.service';
import { AuthenticationService } from './authentication/authentication.service';
import { USERROLE } from './user-role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NavigationRouterService, AuthenticationService]
})
export class AppComponent {
  season = undefined;

  login: boolean = false;
  tipp: boolean = false;
  tippMobile: boolean = false;
  teilnehmer: boolean = false;
  meisterschaften: boolean = false;
  admin: boolean = false;

  constructor(
      private navigationRouterService: NavigationRouterService,
      private authenticationService: AuthenticationService) {

    this.admin = authenticationService.getUserRole() === USERROLE.ADMIN;
    navigationRouterService.sessionSource$.subscribe(
      loginOrLogout => {
        if (loginOrLogout === 'login') {
          this.admin = authenticationService.getUserRole() === USERROLE.ADMIN;
        } else if (loginOrLogout === 'logout') {
          this.admin = false
        }
    });

    navigationRouterService.navigationActivated$.subscribe(
      activatedRoute => {
        console.log('Activated route: ' + activatedRoute);
        if (activatedRoute == 'LOGIN') {
          this.login = true;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
        } else if (activatedRoute == 'TIPP') {
          this.login = false;
          this.tipp = true;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
        } else if (activatedRoute == 'TIPPMOBILE') {
          this.login = false;
          this.tipp = false;
          this.tippMobile = true;
          this.teilnehmer = false;
          this.meisterschaften = false;
        } else if (activatedRoute == 'TEILNEHMER') {
          this.login = false;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = true;
          this.meisterschaften = false;
        } else if (activatedRoute == 'MEISTERSCHAFTEN') {
          this.login = false;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = true;
        }
      }
    );
  }
}
