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
import { Login } from './authentication.service';

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

//    let login = new Login("nickname", "password");
//    service.login(login);
  }));

});
