/* tslint:disable:no-unused-variable */

import {
  TestBed,
   getTestBed,
   async,
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
  let mockBackend: MockBackend;

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
    mockBackend = getTestBed().get(MockBackend);
//    TestBed.compileComponents();
  });

  it('should be defined and callable ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(true).toBe(true);
    expect(service).toBeDefined();

    let login = new Login("nickname", "password");
    let authenticationService: AuthenticationService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [
                          {
                            nickname: "Frosch",
                            role: USERROLE.ADMIN,
                            loginTime: "20170124183400"
                          }
                        ]
                      }
                    )));
        }
      );
    });

    // TODO Der Test da unten funktioniert nicht.

    expect(service).toBeDefined();
    service.login(login).then((value: Rest.SecurityTokenJson) => {
      expect(value.nickname).toEqual("FroschAAA");
    });
    //expect(service).toBeUndefined();
  }));

});
