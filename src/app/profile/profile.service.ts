import { Injectable } from "@angular/core";
import { BetofficeService } from "../betoffice.service";
import { SessionService } from "../session/session.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProfileService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findProfile(nickname: string): Observable<Rest.UserProfileJson> {
        return this.http.get<Rest.UserProfileJson>(this.rootUrl + 'profile/' + nickname);
    }

}