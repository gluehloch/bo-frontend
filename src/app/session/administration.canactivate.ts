import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { USERROLE } from "../user-role.enum";
import { SessionService } from "./session.service";

@Injectable()
export class AdministrationCanActivate implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;

        const authorized = this.sessionService.isAuthorized();
        const role = this.sessionService.getUserRole();

        console.log('User is authorized:', authorized, 'URL:', url, 'Role:', role);

        if (!authorized || role !== USERROLE.ADMIN) {
            this.sessionService.redirectUrl = url;
            this.router.navigate(['/login']);
        }
        
        return authorized;
    }

}