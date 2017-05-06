import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';
import { Authentication } from '../authentication/authentication.component';
import { TippService } from './tipp.service';

import { environment } from '../../environments/environment';

export class Tipp {

  nickname: string;
  securityToken: Rest.SecurityTokenJson;
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

  tipp: Tipp;

  constructor(private cookieService: CookieService, private tippService: TippService) {
    this.tipp = new Tipp();
  }

  findSecurityToken() {
    let betofficeCookie: any = this.cookieService.getObject('betofficeCookie2');
    if (betofficeCookie && <Authentication>betofficeCookie) {
      this.tipp.securityToken = betofficeCookie.securityToken;
      this.tipp.nickname = betofficeCookie.nickname;
    } else {
      this.tipp.securityToken = null;
    }
  }

  ngOnInit() {
    this.findSecurityToken();

    let loggedIn: boolean = (
      this.tipp.securityToken && this.tipp.securityToken.token != 'no_authorization');
    this.tipp.authenticated = loggedIn;

    if (loggedIn) {
      this.tippService.nextTippRound(this.currentSeasonId, this.tipp.nickname)
                      .subscribe((roundJson: Rest.RoundJson) => {
                          this.tipp.round = roundJson;
                        });
    }    
  }

  next() {
    this.tippService.nextRound(this.tipp.round.id, this.tipp.nickname)
                    .subscribe((roundJson: Rest.RoundJson) => {
                        this.tipp.round = roundJson;
                    });
  }

  last() {
    this.tippService.prevRound(this.tipp.round.id, this.tipp.nickname)
                    .subscribe((roundJson: Rest.RoundJson) => {
                        this.tipp.round = roundJson;
                    });
  }

  submitTipp() {
    var submitTipp = {
      nickname: this.tipp.securityToken.nickname,
      token: this.tipp.securityToken.token,
      roundId: this.tipp.round.id,
      submitTippGames: []
    };

    this.tipp.round.games.forEach(game => {
      submitTipp.submitTippGames.push(
        { gameId: game.id, tippResult: {
            homeGoals: game.tipps[0].tipp.homeGoals,
            guestGoals: game.tipps[0].tipp.guestGoals }}
      );
    });

    this.tippService.tipp(submitTipp)
                     .subscribe((roundJson: Rest.RoundJson) => {
                         this.tipp.round = roundJson;
                     });
  }
/*
    var tippSubmitSuccessCallback = function(round) {
        $scope.tipp = {
            round: round,
            serviceResponseMessage: {
                status: 'SUCCESS'
            }
        };
    };

    $scope.submitTipp = function() {
        var tipp = {
            nickname: betofficeCookie.nickname,
            token: betofficeCookie.token,
            roundId: $scope.tipp.round.id,
            tippGames: []
        };

        for (var i = 0, max = $scope.tipp.round.games.length; i < max; i++) {
            tipp.tippGames.push({
                gameId: $scope.tipp.round.games[i].id,
                tippResult: {
                    homeGoals: $scope.tipp.round.games[i].tipp.homeGoals,
                    guestGoals: $scope.tipp.round.games[i].tipp.guestGoals
                }
            });
        }

        tippFactory.tipp(tippSubmitSuccessCallback, tipp);
    };
*/
}
