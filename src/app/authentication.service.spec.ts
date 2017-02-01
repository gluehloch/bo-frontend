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
  ResponseType,
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
    
    TestBed.compileComponents();
  });

  describe('AuthenticationService WITH MOCK # login', () => {
    it('should be defined and callable ...', async(inject(
      [AuthenticationService, MockBackend],
      (authenticationService: AuthenticationService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {

          const mockResponseBody: Rest.SecurityTokenJson = {
            nickname: "Frosch",
            role: USERROLE.USER.toString(),
            loginTime: "20170124183400",
            token: "4711"
          };

          const response = new ResponseOptions({
            body: JSON.stringify(mockResponseBody),
            type: ResponseType.Cors,
            status: 200
          });

          connection.mockRespond(new Response(response));
        });   

        expect(authenticationService).toBeDefined();

        let login = new Login("nickname", "password");

        const x = authenticationService.login(login).subscribe(
          response => {
            console.info('authentication: response=[' + response + "]");
            expect(response).toBeDefined();
            expect(response.nickname).toEqual("Frosch");
            expect(response.role).toEqual(USERROLE.USER);
            expect(response.token).toEqual("4711");
            expect(response.loginTime).toEqual("20170124183400");
          }
        );
    })));
  })
});
