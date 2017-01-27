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

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports: [
        HttpModule
      ]
    });
    //mockBackend = getTestBed().get(MockBackend);
    //TestBed.compileComponents();
  });

  describe('AuthenticationService # login', () => {
    it('should be defined and callable ...', async(inject(
      [AuthenticationService, MockBackend],
      (authenticationService: AuthenticationService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          let mockResponseBody: Rest.SecurityTokenJson = {
            nickname: "Frosch",
            role: USERROLE.USER.toString(),
            loginTime: "20170124183400",
            token: "4711"
          };

          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});

          connection.mockRespond(new Response(response));
        });   

        expect(authenticationService).toBeDefined();

        let login = new Login("nickname", "password");

        authenticationService.login(login).subscribe((value: Rest.SecurityTokenJson) => {
          expect(value).toBeDefined();
          expect(value.nickname).toEqual("FroschAAA"); // Muss 'Frosch' sein. Der Test sollte fehl schlagen.
        });

        authenticationService.login(login);
    })));

/*
    it('should do something async', (done) => {
      setTimeout(() => {
        expect(true).toBe(true);
        done();
      }, 2000);
    });
  });
*/

});
