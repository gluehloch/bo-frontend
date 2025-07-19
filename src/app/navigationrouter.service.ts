import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NavigationRouterService {

    public static readonly ROUTE_HOME = 'HOME';
    public static readonly ROUTE_LOGIN = 'LOGIN';
    public static readonly ROUTE_TIPP = 'TIPP';
    public static readonly ROUTE_TEILNEHMER = 'TEILNEHMER';
    public static readonly ROUTE_MEISTERSCHAFTEN = 'MEISTERSCHAFTEN';
    public static readonly ROUTE_RESEARCH = 'RESEARCH';
    public static readonly ROUTE_ISSUES = 'ISSUES';
    public static readonly ROUTE_ADMIN_MENU = 'ADMIN_MENU';
    public static readonly ROUTE_PROFILE = "PROFILE";

    // Observable string sources
    private navigationSource = new Subject<string>();
    private sessionSource = new Subject<string>();

    // Observable string streams
    navigationActivated$ = this.navigationSource.asObservable();
    sessionSource$ = this.sessionSource.asObservable();

    // Service message commands
    activate(activatedRoute: string): void {
        this.navigationSource.next(activatedRoute);
    }

    login(): void {
        this.sessionSource.next('login');
    }

    logout(): void {
        this.sessionSource.next('logout');
    }

}
