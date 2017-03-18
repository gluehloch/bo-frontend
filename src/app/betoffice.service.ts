import { RequestOptions, Headers, Http, Response } from '@angular/http';

import { environment } from '../environments/environment';

/**
 * Common parent of all service classes.
 */
export abstract class BetofficeService {

  protected rootUrl = environment.rootUrl;
  protected options: RequestOptions;
  protected http: Http;

  constructor(http: Http) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });
    this.http = http;
  }

  /**
   * The default error handle. Should be overwritten.
   */
  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}