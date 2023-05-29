import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BetofficeService } from '../betoffice.service';
import { SessionService } from '../session/session.service';

export interface PingJson {
    dateTime: string;
    dateTimeZone: string;
}

@Injectable()
export class TippService extends BetofficeService {

    constructor(http: HttpClient, sessionService: SessionService) {
        super(http, sessionService);
    }

    rounds(seasonId: number): Observable<Rest.SeasonJson> {
        return this.http.get<Rest.SeasonJson>(this.rootUrl + '/season/' + seasonId);
    }

    currentRound(seasonId: number, nickName: string): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(
            this.rootUrl + 'tipp/' + seasonId + '/' + nickName + '/current', { headers: this.createHeader() });
    }

    findTipp(roundId: number, nickName: string): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'tipp/' + roundId + '/' + nickName, { headers: this.createHeader() });
    }

    nextRound(roundId: number, nickName: string): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'tipp/' + roundId + '/' + nickName + '/next', { headers: this.createHeader() });
    }

    prevRound(roundId: number, nickName: string): Observable<Rest.RoundJson> {
        return this.http.get<Rest.RoundJson>(this.rootUrl + 'tipp/' + roundId + '/' + nickName + '/prev', { headers: this.createHeader() });
    }

    tipp(tippRoundJson: Rest.SubmitTippRoundJson): Observable<Rest.RoundJson> {
        return this.http.post<Rest.RoundJson>(this.rootUrl + 'tipp/submit', tippRoundJson, { headers: this.createHeader() });
    }

    dateTime(): Observable<PingJson> {
        return this.http.get<PingJson>(this.rootUrl + 'ping', { headers: this.createHeader() });
    }

}
