import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

// TODO Was ist das hier?
import 'rxjs/add/operator/toPromise';



export class Login {
    nickname: string;
    password: string;
}

export class Logout {
    nickname: string;
    token: string;
}

export enum USER_ROLE {
    ADMIN,
    USER
};

export class Authentication {
    nickname: string;
    password: string;
    authenticate: boolean;
    rememberme: boolean;
    authenticationTries: number;
    /** sessionId - Ist aber eigentlich das 'token' aus dem Login-Request. Jetzt nach 'token' umbenannt. */
    token: string;
    role: USER_ROLE = USER_ROLE.USER;

    constructor(nickname : string, role : USER_ROLE) {
        this.nickname = nickname;
        this.role = role;
    }

    isAdmin() {
        return this.role === USER_ROLE.ADMIN;
    }
}

var url = 'http://localhost:8080/betoffice-jweb/bo/office/';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private rootUrl: URL) { }

    login(login: Login): void {
        return this.http.get(this.rootUrl + "login")
                  .toPromise()
                  .then(response => response.json().data as Hero[])
                  .catch(this.handleError);
    }

    logout(login: Login): void {

    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                  .toPromise()
                  .then(response => response.json().data as Hero[])
                  .catch(this.handleError);
    }

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