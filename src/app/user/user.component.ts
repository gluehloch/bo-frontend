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

  partiesModel: Array<Rest.PartyJson>;

  constructor(private userService: UserService) {
    this.users = new Array();
  }

  ngOnInit() {
    this.userService.findUsers().subscribe((parties: Array<Rest.PartyJson>) => {
      this.partiesModel = parties;
    });
  }

}
