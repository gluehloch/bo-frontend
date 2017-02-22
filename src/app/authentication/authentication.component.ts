import { Component, OnInit } from '@angular/core';

import { USERROLE } from '../user-role.enum';

import { Authentication } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  authentication: Authentication;

  constructor() {
    this.authentication = new Authentication(undefined, USERROLE.UNKNOWN);
  }

  ngOnInit() {
  }

}
