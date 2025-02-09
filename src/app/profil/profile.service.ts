import { Injectable } from "@angular/core";
import { BetofficeService } from "../betoffice.service";
import { SessionService } from "../session/session.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProfileService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

}