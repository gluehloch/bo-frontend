import { RequestOptions, Headers, Http, Response } from '@angular/http';

import { USERROLE } from './user-role.enum';
import { environment } from '../environments/environment';

/**
 * Common parent of all service classes.
 */
export abstract class BetofficeService {

  private static readonly BETOFFICE_CREDENTIAL = "betofficeCredential";

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
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private createHeader() : Headers {
    let headers = new Headers({'Content-Type': 'application/json'});
    return headers;    
  }

  public createRequestOptions() : RequestOptions {
    let headers = this.createHeader();
    let credentials = this.readCredentials();
    if (credentials && credentials.token) {
      headers.append('betofficeToken', credentials.token);
      headers.append('betofficeNickname', credentials.nickname);      
    } 

    let options = new RequestOptions({ headers: headers });
    return options;
  }

  public isAuthorized() {
    let securityTokenJson = this.readCredentials();
    // Probably there is a authorized user. I´m only the frontend.
    return (securityTokenJson && securityTokenJson.token);
  }

  public storeCredentials(token: Rest.SecurityTokenJson) {
    localStorage.setItem(BetofficeService.BETOFFICE_CREDENTIAL, JSON.stringify(token));
  }

  public clearCredentials() {
    localStorage.removeItem(BetofficeService.BETOFFICE_CREDENTIAL);
  }

  public readCredentials() : Rest.SecurityTokenJson {
    var credentialsAsJson = localStorage.getItem(BetofficeService.BETOFFICE_CREDENTIAL);
    return JSON.parse(credentialsAsJson);
  }

  public getUserRole() : USERROLE {
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
