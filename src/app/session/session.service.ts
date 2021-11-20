import { Injectable } from '@angular/core';
import { BetofficeService } from '../betoffice.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private static readonly BETOFFICE_CREDENTIAL = 'betofficeCredential';

    constructor() { }

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
    
}
