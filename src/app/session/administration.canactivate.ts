import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "./session.service";

@Injectable()
export class AdministrationCanActivate implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;

        let authorized = this.sessionService.isAuthorized();
        console.log('User is authorized:', authorized, 'Access URL:', url);

        if (!authorized) {
            this.sessionService.redirectUrl = url;
            this.router.navigate(['/login']);
        }
        
        return authorized;
    }

}