import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SessionService } from "../session/session.service";

@Injectable()
export class BetofficeRequestInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const credentials = this.sessionService.readCredentials();
        let authReq;
        if (credentials && credentials.token) {
            authReq = req.clone({
                headers: req.headers
                    /*
                    .append('Cache-Control', 'no-cache, no-store, must-revalidate')
                    .append('Pragma', 'no-cache')
                    .append('Expires', '0')
                    .append('Content-Type', 'application/json')
                    .append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                    .append('Access-Control-Allow-Headers', 'Content-Type, x-auth-token')
                    .append('Access-Control-Allow-Origin', '*')
                    .append('Access-Control-Allow-Credentials', 'true')
                    */
                    .append('betofficeToken', credentials.token)
                    .append('betofficeNickname', credentials.nickname)
                    .append('Authorization', 'Bearer ' + credentials.token)
            });
        } else {
            authReq = req.clone({
                headers: req.headers
                    /*
                    .append('Cache-Control', 'no-cache, no-store, must-revalidate')
                    .append('Pragma', 'no-cache')
                    .append('Expires', '0')
                    .append('Content-Type', 'application/json')
                    .append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                    .append('Access-Control-Allow-Headers', 'Content-Type, x-auth-token')
                    .append('Access-Control-Allow-Origin', '*')
                    .append('Access-Control-Allow-Credentials', 'true')
                    */
                    .append('betofficeToken', 'undefined')
                    .append('betofficeNickname', 'undefined')
                    .append('Authorization', 'Bearer undefined')
            });
        }
        return next.handle(authReq);
    }

}