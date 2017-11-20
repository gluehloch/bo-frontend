import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'teamFilter',
    pure: false
})
export class TeamFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // return items.filter(item => item.title.indexOf(filter.title) !== -1);
        return items;
    }

}
