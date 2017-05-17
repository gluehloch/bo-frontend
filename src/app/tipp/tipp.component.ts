import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';
import { Authentication } from '../authentication/authentication.component';
import { TippService } from './tipp.service';

import { environment } from '../../environments/environment';

export class TippModel {

  nickname: string;
  authenticated: boolean;
  round: Rest.RoundJson;

}

@Component({
  selector: 'tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css']
})
export class TippComponent implements OnInit {

  currentSeasonId = environment.currentSeasonId;

  tippModel: TippModel;

  constructor(private cookieService: CookieService, private tippService: TippService) {
    this.tippModel = new TippModel();
  }

  checkAuthorization() {
    if (this.tippService.isAuthorized) {
      this.tippModel.nickname = this.tippService.readCredentials().nickname;
      this.tippModel.authenticated = true;
    } else {
      this.tippModel.nickname = null;
      this.tippModel.authenticated = false;
    }
  }

  ngOnInit() {
    this.checkAuthorization();

    if (this.tippModel.authenticated) {
      this.tippService.nextTippRound(this.currentSeasonId, this.tippModel.nickname)
                      .subscribe((roundJson: Rest.RoundJson) => {
                          this.tippModel.round = roundJson;
                        });
    }    
  }

  next() {
    this.tippService.nextRound(this.tippModel.round.id, this.tippModel.nickname)
                    .subscribe((roundJson: Rest.RoundJson) => {
                        this.tippModel.round = roundJson;
                    });
  }

  last() {
    this.tippService.prevRound(this.tippModel.round.id, this.tippModel.nickname)
                    .subscribe((roundJson: Rest.RoundJson) => {
                        this.tippModel.round = roundJson;
                    });
  }

  submitTipp() {
    var submitTipp = {
      nickname: this.tippModel.nickname,
      roundId: this.tippModel.round.id,
      submitTippGames: []
    };

    this.tippModel.round.games.forEach(game => {
      submitTipp.submitTippGames.push(
        { gameId: game.id, tippResult: {
            homeGoals: game.tipps[0].tipp.homeGoals,
            guestGoals: game.tipps[0].tipp.guestGoals }}
      );
    });

    this.tippService.tipp(submitTipp)
                     .subscribe((roundJson: Rest.RoundJson) => {
                         this.tippModel.round = roundJson;
                     });
  }

}
