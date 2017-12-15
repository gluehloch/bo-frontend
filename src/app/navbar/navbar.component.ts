// core/navbar.component.ts
import { Component } from '@angular/core';

import { NavigationRouterService } from '../navigationrouter.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { USERROLE } from '../user-role.enum';

@Component({
    selector: 'bo-navbar',
    templateUrl: './navbar.component.html',
    providers: [NavigationRouterService, AuthenticationService]
})
export class NavbarComponent {

  // Activated view
  home = true;
  login = false;
  tipp =  false;
  teilnehmer = false;
  meisterschaften = false;
  adminmenu = false;

  showNavbar = false;

  // Session role
  admin = false;

  constructor(
      private navigationRouterService: NavigationRouterService,
      private authenticationService: AuthenticationService) {

    this.admin = authenticationService.getUserRole() === USERROLE.ADMIN;
    navigationRouterService.sessionSource$.subscribe(
      loginOrLogout => {
        if (loginOrLogout === 'login') {
          this.admin = authenticationService.getUserRole() === USERROLE.ADMIN;
        } else if (loginOrLogout === 'logout') {
          this.admin = false;
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

  toggleState() {
    this.showNavbar = !this.showNavbar;
  }

}
