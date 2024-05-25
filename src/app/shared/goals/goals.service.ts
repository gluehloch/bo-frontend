import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BetofficeService } from "src/app/betoffice.service";
import { SessionService } from "src/app/session/session.service";

@Injectable()
export class GoalsService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    findGameDetails(gameId: number): Observable<Rest.GameDetailsJson> {
        return this.http.get<Rest.GameDetailsJson>(this.rootUrl + 'game-details/' + gameId);
    }

}
