import { Injectable } from '@angular/core';
import { USERROLE } from '../user-role.enum';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private static readonly BETOFFICE_CREDENTIAL = 'betofficeCredential';

    redirectUrl: string | undefined;

    public storeCredentials(token: Rest.SecurityTokenJson) {
        localStorage.setItem(SessionService.BETOFFICE_CREDENTIAL, JSON.stringify(token));
    }

    public clearCredentials() {
        localStorage.removeItem(SessionService.BETOFFICE_CREDENTIAL);
    }

    public readCredentials(): Rest.SecurityTokenJson {
        const credentialsAsJson = localStorage.getItem(SessionService.BETOFFICE_CREDENTIAL);
        return JSON.parse(credentialsAsJson);
    }

    public getNickname() {
        return this.readCredentials().nickname;
    }
 
    public isAuthorized(): boolean {
        // TODO Token abgelaufen? Token erneuern?
        const securityTokenJson = this.readCredentials();
        // Probably there is an authorized user. I´m only the frontend.
        return (securityTokenJson !== null && securityTokenJson.token !== null);
    }

    public getUserRole(): USERROLE {
        if (this.isAuthorized()) {
            switch (this.readCredentials().role) {
                case 'TIPPER':
                    return USERROLE.TIPPER;
                case 'ADMIN':
                    return USERROLE.ADMIN;
                case 'SEASON_ADMIN':
                    return USERROLE.SEASON_ADMIN;
                default:
                    return USERROLE.UNKNOWN;
            }
        }
        return USERROLE.UNKNOWN;
    }

}
