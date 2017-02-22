import { Component, OnInit } from '@angular/core';

import { SessionService } from './session.service';

@Component({
  selector: 'ranking',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  //ranking: Rest.UserTableJson;

  constructor(private sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  ngOnInit() {
    // TODO Die Meisterschaft ist hier fest verdrahtet.
    /*
    this.rankingService.calculate(25)
                       .subscribe((userTable: Rest.UserTableJson) => {
      this.ranking = userTable;
    });
    */
  }

}