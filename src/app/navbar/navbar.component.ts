// core/navbar.component.ts
import { Component } from '@angular/core';

import { NavigationRouterService } from '../navigationrouter.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { USERROLE } from '../user-role.enum';
import { SessionService } from '../session/session.service';

enum NavState {
    home,
    login,
    tipp,
    teilnehmer,
    meisterschaft,
    adminmenu
}

class NavMenu {
    home = true;
    login = false;
    tipp = false;
    teilnehmer = false;
    meisterschaften = false;
    adminmenu = false;

    currentNavState: NavState;

    changeState(newState: NavState): void {
        this.home = false;
        this.login = false;
        this.tipp = false;
        this.teilnehmer = false;
        this.meisterschaften = false;
        this.adminmenu = false;

        switch (newState) {
            case NavState.home:
                this.home = true; break;
            case NavState.login:
                this.login = true; break;
            case NavState.tipp:
                this.tipp = true; break;
            case NavState.teilnehmer:
                this.teilnehmer = true; break;
            case NavState.adminmenu:
                this.adminmenu = true; break;
            case NavState.meisterschaft:
                this.meisterschaften = true; break;
        }
        this.currentNavState = newState;
    }
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    private readonly textLogin = 'Login';
    private readonly textLogout = 'Logout';
    loginOrLogout = this.textLogin;

    navMenu = new NavMenu();
    admin = false;

    constructor(
        private sessionService: SessionService,
        private navigationRouterService: NavigationRouterService,
        private authenticationService: AuthenticationService) {

        if (sessionService.isAuthorized()) {
            const nickname = sessionService.readCredentials().nickname;
            this.loginOrLogout = this.textLogout + ' ' + nickname;
        } else {
            this.loginOrLogout = this.textLogin;
        }
        this.admin = sessionService.getUserRole() === USERROLE.ADMIN;

        navigationRouterService.sessionSource$.subscribe(
            loginOrLogoutState => {
                if (loginOrLogoutState === 'login') {
                    this.loginOrLogout = this.textLogout + ' ' + sessionService.readCredentials().nickname;
                    this.admin = sessionService.getUserRole() === USERROLE.ADMIN;
                } else if (loginOrLogoutState === 'logout') {
                    this.loginOrLogout = this.textLogin;
                    this.admin = false;
                }
            });

        navigationRouterService.navigationActivated$.subscribe(
            activatedRoute => {
                //this.closeCollapse();
                console.log('Activated route: ' + activatedRoute);
                this.toggleMenuStates(activatedRoute);
            }
        );
    }

    private toggleMenuStates(activatedRoute: string) {
        if (activatedRoute === NavigationRouterService.ROUTE_HOME) {
            this.navMenu.changeState(NavState.home);
        } else if (activatedRoute === NavigationRouterService.ROUTE_LOGIN) {
            this.navMenu.changeState(NavState.login);
        } else if (activatedRoute === NavigationRouterService.ROUTE_TIPP) {
            this.navMenu.changeState(NavState.tipp);
        } else if (activatedRoute === NavigationRouterService.ROUTE_TEILNEHMER) {
            this.navMenu.changeState(NavState.teilnehmer);
        } else if (activatedRoute === NavigationRouterService.ROUTE_MEISTERSCHAFTEN) {
            this.navMenu.changeState(NavState.meisterschaft);
        } else if (activatedRoute === NavigationRouterService.ROUTE_ADMIN_MENU) {
            this.navMenu.changeState(NavState.adminmenu);
        }
    }

}
