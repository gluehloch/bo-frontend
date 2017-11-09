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
  home: boolean = true;
  login: boolean = false;
  tipp: boolean = false;
  teilnehmer: boolean = false;
  meisterschaften: boolean = false;
  adminmenu: boolean = false;

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
        if (activatedRoute === NavigationRouterService.ROUTE_HOME) {
          this.home = true;
          this.login = false;
          this.tipp = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminmenu = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_LOGIN) {
          this.home = false;
          this.login = true;
          this.tipp = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminmenu = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_TIPP) {
          this.home = false;
          this.login = false;
          this.tipp = true;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminmenu = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_TEILNEHMER) {
          this.home = false;
          this.login = false;
          this.tipp = false;
          this.teilnehmer = true;
          this.meisterschaften = false;
          this.adminmenu = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_MEISTERSCHAFTEN) {
          this.home = false;
          this.login = false;
          this.tipp = false;
          this.teilnehmer = false;
          this.meisterschaften = true;
          this.adminmenu = false;
        } else if (activatedRoute === NavigationRouterService.ROUTE_ADMIN_MENU) {
          this.home = false;
          this.login = false;
          this.tipp = false;
          this.teilnehmer = false;
          this.meisterschaften = false;
          this.adminmenu = true;
        }
      }
    );
  }
}
