import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { TeamUpdateService } from './teamupdate.service';

import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-teamupdate',
    templateUrl: './teamupdate.component.html',
    styleUrls: ['./teamupdate.component.css'],
    standalone: true,
    imports: [FormsModule]
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
            type: 'DFB' as Rest.TeamType,
            openligaid: 0
        }
        this.team = team;
    }

    ngOnInit() {
        this.route.params.pipe(map(params => params['id'])).subscribe((id) => {
            this.teamService.findTeam(id).subscribe((team: Rest.TeamJson) => this.team = team);
        });
    }

    updateTeam() {
        this.teamService.updateTeam(this.team).subscribe((team: Rest.TeamJson) => {
            this.team = team;
            this.routeToTeamOverview();
        });
    }

    abort() {
        this.routeToTeamOverview();
    }

    private routeToTeamOverview() {
        this.router.navigate(['./chiefop/team']);
    }

}
