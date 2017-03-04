import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';
import { Authentication } from '../authentication/authentication.component';
import { TippService } from './tipp.service';


export class Tipp {

  nickname: string;
  securityToken: Rest.SecurityTokenJson;
  authenticated: boolean;

}

@Component({
  selector: 'tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css']
})
export class TippComponent implements OnInit {

  tipp: Tipp;

  constructor(private cookieService: CookieService, private tippService: TippService) {
    this.tipp = new Tipp();
  }

  ngOnInit() {
    let betofficeCookie: any = this.cookieService.getObject('betofficeCookie2');
    if (betofficeCookie && <Authentication>betofficeCookie) {
      this.tipp.securityToken = betofficeCookie._securityToken;
      this.tipp.nickname = betofficeCookie.securityToken.nickname;
    } else {
      this.tipp.securityToken = null;
    }

    let loggedIn: boolean = (this.tipp.securityToken && this.tipp.securityToken.token != 'no_authorization');
    this.tipp.authenticated = loggedIn;

    if (loggedIn) {
        this.tippService.nextTippRound(callback, $routeParams.seasonId, betofficeCookie.nickname);
    }    
  }





    $scope.next = function(round) {
        tippFactory.nextRound(callback, round.id, betofficeCookie.nickname);
    };

    $scope.last = function(round) {
        tippFactory.prevRound(callback, round.id, betofficeCookie.nickname);
    };

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
}
