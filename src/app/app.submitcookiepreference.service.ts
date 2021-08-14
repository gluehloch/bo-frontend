import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';

export class CookieData {
    website = environment.website;
    acceptCookies: boolean;

    constructor(acceptCookies: boolean) {
        this.acceptCookies = acceptCookies;
    }
}

export class DataTimeJson {
    dataeTime: number;
}

@Injectable()
export class SubmitCookiePreferenceService {
    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    sendCookieOptions(cookieData: CookieData) {
        this.cookieService.putObject('cookieData', cookieData);

        return this.http.post<boolean>(
            environment.cookieserviceUrl,
            cookieData,
            {headers: this.createHeader()}
        ).subscribe(response => {
            console.log('SubmitCookiePreferenceService', response);
        }, error => {
            console.error('SubmitCookiePreferenceService Error', error);
        });
    }

    private createHeader() {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Origin', '*');
        return headers;
    }

}
