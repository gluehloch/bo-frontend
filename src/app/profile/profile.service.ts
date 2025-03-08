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

    updateProfile(profile: Rest.UserProfileJson): Observable<Rest.UserProfileJson> {
        return this.http.put<Rest.UserProfileJson>(this.rootUrl + 'profile/' + profile.nickname, profile);
    }

    confirmUupdateProfile(profile: Rest.UserProfileJson): Observable<Rest.UserProfileJson> {
        return this.http.put<Rest.UserProfileJson>(this.rootUrl + 'profile/' + profile.nickname + '/confirm', profile);
    }

    resubmitConfirmationMail(nickname: string): Observable<Rest.UserProfileJson> {
        return this.http.post<Rest.UserProfileJson>(this.rootUrl + 'profile/' + nickname + '/resubmitMailConfirmation', {});
    }

}