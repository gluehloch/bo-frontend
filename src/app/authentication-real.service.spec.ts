/* tslint:disable:no-unused-variable */

import {
  TestBed,
  getTestBed,
  async,
  fakeAsync,
  inject 
} from '@angular/core/testing';

import {
  Headers,
  BaseRequestOptions,
  Response,
  HttpModule,
  Http,
  XHRBackend,
  RequestMethod
} from '@angular/http';

import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthenticationService } from './authentication.service';
// import { SecurityTokenJson } from './betoffice-json.d';
import { Login } from './authentication.service';
import { USERROLE } from './user-role.enum';

describe('AuthenticationService WITH BETOFFICE SERVER', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService
      ],
      imports: [
        HttpModule
      ]
    });
    
    TestBed.compileComponents();
  });

  it('should be defined and callable ...', async(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
    expect(authenticationService).toBeDefined();

    let login = new Login("nickname", "password");
    //
    //let observer: Observable<Rest.SecurityTokenJson>;

    const x = authenticationService.login(login).subscribe((value: Rest.SecurityTokenJson) => {
      expect(value).toBeDefined();
      expect(value.nickname).toEqual("FroschAAA"); // Muss 'Frosch' sein. Der Test sollte fehl schlagen.
    }, (error => { console.error("ERROR: Ups. Da kommit nichts sinnvolles vom Server zurueck.")}));

    authenticationService.login(login);
  })));

});
