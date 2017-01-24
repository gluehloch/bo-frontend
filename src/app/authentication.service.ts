import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';

import { USERROLE } from './user-role.enum';

// Wie funktionieren Namespaces???
/// reference path="./securitytoken.d";
// declare var securitytoken: Rest.SecurityTokenJson;


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

    private rootUrl = 'http://localhost:8080/betoffice-jweb/bo/office/';

    // TODO Injectable: , private rootUrl: URL
    constructor(private http: Http) { }

    login(login: Login): Promise<Rest.SecurityTokenJson> {
        return this.http.get(this.rootUrl + "login")
                  .toPromise()
                  .then(response => response.json().data as Rest.SecurityTokenJson)
                  .catch(this.handleError);
    }

    logout(login: Login): void {

    }

/* Example:
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                  .toPromise()
                  .then(response => response.json().data as Hero[])
                  .catch(this.handleError);
    }
*/

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
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