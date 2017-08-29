import { RequestOptions, Headers, Http, Response } from '@angular/http';

import { USERROLE } from './user-role.enum';
import { environment } from '../environments/environment';

/**
 * Common parent of all service classes.
 */
export abstract class BetofficeService {

  private static readonly BETOFFICE_CREDENTIAL = 'betofficeCredential';

  protected rootUrl = environment.rootUrl;
  protected adminUrl = environment.adminUrl;
  protected http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  /**
   * The default error handle. Should be overwritten.
   */
  protected handleError(error: any): Promise<any> {
    if (error.status == 403) {
      console.info('Access denied. Renew your authentification.');
    } else {
      console.error('Unknwon Error status: ', error.status);
    }
    return Promise.reject(error);
    // return Promise.reject(error.message);
  }

  private createHeader(): Headers {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  public createRequestOptions(): RequestOptions {
    const headers = this.createHeader();
    const credentials = this.readCredentials();
    if (credentials && credentials.token) {
      headers.append('betofficeToken', credentials.token);
      headers.append('betofficeNickname', credentials.nickname);
    }

    const options = new RequestOptions({ headers: headers });
    return options;
  }

  public isAuthorized() {
    const securityTokenJson = this.readCredentials();
    // Probably there is a authorized user. I´m only the frontend.
    return (securityTokenJson && securityTokenJson.token);
  }

  public storeCredentials(token: Rest.SecurityTokenJson) {
    localStorage.setItem(BetofficeService.BETOFFICE_CREDENTIAL, JSON.stringify(token));
  }

  public clearCredentials() {
    localStorage.removeItem(BetofficeService.BETOFFICE_CREDENTIAL);
  }

  public readCredentials(): Rest.SecurityTokenJson {
    const credentialsAsJson = localStorage.getItem(BetofficeService.BETOFFICE_CREDENTIAL);
    return JSON.parse(credentialsAsJson);
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
