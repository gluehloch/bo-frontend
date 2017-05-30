import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { USERROLE } from '../user-role.enum';
import { UserService } from './user.service';

import { environment } from '../../environments/environment';

export class UserModel {

  nickname: string;
  authenticated: boolean;
  round: Rest.RoundJson;

}

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentSeasonId = environment.currentSeasonId;

  userModel: UserModel;

  constructor(private cookieService: CookieService, private userService: UserService) {
    this.userModel = new UserModel();
  }

  ngOnInit() {
  }

}
