import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'teamFilter',
    pure: false,
    standalone: true
})
export class TeamFilter implements PipeTransform {

    transform(teams: Rest.TeamJson[], dfb: string, name: string): Rest.TeamJson[] {
        return teams.filter(team => team.type === dfb && team.name.includes(name));
    }

}
