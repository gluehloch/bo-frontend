import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { BetofficeService } from '../betoffice.service';

import { USERROLE } from '../user-role.enum';

export class Login {
    readonly nickname: string;
    readonly password: string;

    constructor(nickname: string, password: string) {
        this.nickname = nickname;
        this.password = password;
    }
}

export class Logout {
    nickname: string;
    token: string;
}

export class Authentication implements Rest.SecurityTokenJson {

/* SecurityTokenJson
    private String nickname;
    private String role;
    private String loginTime;
*/

    readonly nickname: string;
    readonly password: string;
    authenticate: boolean;
    rememberme: boolean;
    authenticationTries: number;
    /** sessionId - Ist aber eigentlich das 'token' aus dem Login-Request. Jetzt nach 'token' umbenannt. */
    token: string;
    role: string;
    userRole: USERROLE;

    constructor(nickname : string, role : USERROLE) {
        this.nickname = nickname;
        this.role = role;
    }

    isAdmin() {
        return this.userRole === USERROLE.ADMIN;
    }
}

@Injectable()
export class AuthenticationService extends BetofficeService {

  constructor(http: Http) {
    super(http);
  }

  login(login: Login): Observable<Rest.SecurityTokenJson> {
    let response = this.http.post(this.rootUrl + "login", login, this.options);

    return response.map((r: Response) => r.json() as Rest.SecurityTokenJson)
                   .catch(this.handleError);
  }

  logout(logout: Logout): void {
    let response = this.http.post(this.rootUrl + "logout", logout, this.options);

    response.map((r: Response) => r.json())
            .catch(this.handleError);
  }

}

/*

betofficeApp.factory('SessionFactory', ['$http', function($http) {
    return {
        login: function(callback, nickname, password) {
            $http.post(url + 'login',
                {
                    nickname: nickname,
                    password: password
                }).success(callback);
        },
        logout: function(callback, nickname, token) {
            $http.post(url + 'logout',
                {
                    nickname: nickname,
                    token: token
                }).success(callback);
        }
    };
}]);

*/