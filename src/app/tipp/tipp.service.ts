import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

// TODO Wohin damit?
var url = 'http://localhost:8080/betoffice-jweb/bo/office/';

@Injectable()
export class TippService {

  // TODO Injectable
  private rootUrl = 'http://localhost:8080/betoffice-jweb/bo/office/';

  // TODO Injectable: , private rootUrl: URL
  constructor(private http: Http) { }

  login() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.post(this.rootUrl + "tipp", options);
  }

  private handleError(error: any): Promise<any> {
    // TODO Error handling
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
