import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { USERROLE } from '../user-role.enum';

export class Login {
    nickname: string;
    password: string;

    constructor(nickname: string, password: string) {
        this.nickname = nickname;
        this.password = password;
    }
}

export class Logout {
    nickname: string;
    token: string;
}

export class Authentication {
    nickname: string;
    password: string;
    authenticate: boolean;
    rememberme: boolean;
    authenticationTries: number;
    /** sessionId - Ist aber eigentlich das 'token' aus dem Login-Request. Jetzt nach 'token' umbenannt. */
    token: string;
    role: USERROLE = USERROLE.USER;

    constructor(nickname : string, role : USERROLE) {
        this.nickname = nickname;
        this.role = role;
    }

    isAdmin() {
        return this.role === USERROLE.ADMIN;
    }
}

// TODO Wohin damit?
var url = 'http://localhost:8080/betoffice-jweb/bo/office/';

@Injectable()
export class AuthenticationService {

    // TODO Injectable
    private rootUrl = 'http://localhost:8080/betoffice-jweb/bo/office/';

    // TODO Injectable: , private rootUrl: URL
    constructor(private http: Http) { }

    login(login: Login): Observable<Rest.SecurityTokenJson> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let response = this.http.post(this.rootUrl + "login", login, options);

        return response.map((r: Response) => r.json() as Rest.SecurityTokenJson)
                       .catch(this.handleError);
    }

    logout(login: Login): void {

    }

    private handleError(error: any): Promise<any> {
        // TODO Error handling
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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