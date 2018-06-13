import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { TeamUpdateService } from './teamupdate.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-teamupdate',
    templateUrl: './teamupdate.component.html',
    styleUrls: ['./teamupdate.component.css']
})
export class TeamUpdateComponent implements OnInit {

    team: Rest.TeamJson;

    constructor(private router: Router, private route: ActivatedRoute, private teamService: TeamUpdateService) {
        const team = {
            id: 0,
            name: '',
            longName: '',
            shortName: '',
            xshortName: '',
            logo: '',
            type: '',
            openligaid: 0
        }
        this.team = team;
    }

    ngOnInit() {
        this.route.params.map(params => params['id']).subscribe((id) => {
            this.teamService.findTeam(id).subscribe((team: Rest.TeamJson) => this.team = team);
        });
    }

    updateTeam() {
        this.teamService.updateTeam(this.team).subscribe((team: Rest.TeamJson) => this.team = team);
    }

}
