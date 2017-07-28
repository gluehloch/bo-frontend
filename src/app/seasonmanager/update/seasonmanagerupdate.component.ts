import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { SeasonManagerUpdateService } from './seasonmanagerupdate.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'season-manager-update',
  templateUrl: './seasonmanagerupdate.component.html',
  styleUrls: ['./seasonmanagerupdate.component.css']
})
export class SeasonManagerUpdateComponent implements OnInit {

  season: Rest.SeasonJson;

  constructor(private router: Router, private route: ActivatedRoute, private seasonManagerUpdateService: SeasonManagerUpdateService) {
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.seasonManagerUpdateService.findSeason(id).subscribe((season: Rest.SeasonJson) => this.season = season);
    });
  }

  updateSeason() {
    this.seasonManagerUpdateService.updateSeason(this.season).subscribe((season: Rest.SeasonJson) => this.season = season);
  }

}
