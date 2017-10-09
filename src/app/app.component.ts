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

  // Activated view
  login: boolean = false;
  tipp: boolean = false;
  tippMobile: boolean = false;
  teilnehmer: boolean = false;
  meisterschaften: boolean = false;
  adminTeilnehmer: boolean = false;
  adminMeisterschaften: boolean = false;

  // Session role
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
        if (activatedRoute === NavigationRouterService.ROUTE_LOGIN) {
          this.login = true;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminMeisterschaften = false;
          this.adminTeilnehmer = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_TIPP) {
          this.login = false;
          this.tipp = true;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminMeisterschaften = false;
          this.adminTeilnehmer = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_TIPPMOBILE) {
          this.login = false;
          this.tipp = false;
          this.tippMobile = true;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminMeisterschaften = false;
          this.adminTeilnehmer = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_TEILNEHMER) {
          this.login = false;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = true;
          this.meisterschaften = false;
          this.adminMeisterschaften = false;
          this.adminTeilnehmer = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_MEISTERSCHAFTEN) {
          this.login = false;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = true;
          this.adminMeisterschaften = false;
          this.adminTeilnehmer = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_ADMIN_MEISTERSCHAFTEN) {
          this.login = false;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminMeisterschaften = true;
          this.adminTeilnehmer = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_ADMIN_TEILNEHMER) {
          this.login = false;
          this.tipp = false;
          this.tippMobile = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminMeisterschaften = false;
          this.adminTeilnehmer = true;
        }
      }
    );
  }
}
