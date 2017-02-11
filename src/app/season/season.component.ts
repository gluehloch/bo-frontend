import { Component, OnInit } from '@angular/core';

import { USERROLE } from '../user-role.enum';

@Component({
  selector: 'season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})

export class Roundtable {
  seasons: Rest.SeasonJson[];
  selectedSeason: Rest.SeasonJson;
  groups: Rest.GroupTypeJson[];
  selectedGroup: Rest.GroupTypeJson[];
  rounds: Rest.RoundJson[];
  selectedRound: Rest.RoundJson;
  table: string /* TODO Array!*/
};

export class SeasonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
