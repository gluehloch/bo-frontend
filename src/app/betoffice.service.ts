// import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { SessionService } from './session/session.service';

/**
 * Common parent of all service classes.
 */
export abstract class BetofficeService {

    protected rootUrl           = environment.rootUrl;
    protected authenticationUrl = environment.authenticationUrl;
    protected adminUrl          = environment.adminUrl;
    protected communityAdminUrl = environment.communityAdminUrl;

    protected http: HttpClient;
    protected sessionService: SessionService;

    constructor(http: HttpClient, sessionService: SessionService) {
        this.http = http;
        this.sessionService = sessionService;
    }

    /**
     * The default error handle. Should be overwritten.
     */
    protected handleError(error: any): Promise<any> {
        if (error.status === 403) {
            console.log('Access denied. Renew your authentification.');
            // The authentication token timed out. So it is better to remove the token now.
            this.sessionService.clearCredentials();
        } else {
            console.error('Unknwon Error status: ', error.status);
        }
        return Promise.reject(error);
        // return Promise.reject(error.message);
    }

    /*
    public createHeader(): HttpHeaders {
        let headers = new HttpHeaders()
            // TODO Is this necessary? All this no caching parameters?
            .append('Cache-Control', 'no-cache, no-store, must-revalidate')
            .append('Pragma', 'no-cache')
            .append('Expires', '0')
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Origin', '*');

        // Authorization: Bearer TestAuthorization

        const credentials = this.sessionService.readCredentials();
        if (credentials && credentials.token) {
            headers = headers
                .append('betofficeToken', credentials.token)
                .append('betofficeNickname', credentials.nickname)
                .append('Authorization', 'Bearer ' + credentials.token);
        } else {
            headers = headers
                .append('betofficeToken', 'undefined')
                .append('betofficeNickname', 'undefined')
                .append('Authorization', 'Bearer undefined');
        }
        return headers;
    }
    */

}
