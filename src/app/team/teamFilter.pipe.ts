import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'teamFilter',
    pure: false
})
export class TeamFilter implements PipeTransform {

    transform(teams: Rest.TeamJson[], dfb: string): any {
        if (!teams || !dfb) {
            return teams;
        }

        // filter teams Rest.TeamJson, teams Rest.TeamJson match and return true will be
        // kept, false will be filtered out
        // return teams.Rest.TeamJson(item => item.title.indexOf(filter.title) !== -1);
        return teams.filter(team => team.type === dfb);
    }

}
