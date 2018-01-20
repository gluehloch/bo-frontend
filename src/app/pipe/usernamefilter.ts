import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernamefilter',
  pure: false
})
export class UsernameFilter implements PipeTransform {
  transform(usernames: any[], filter: Object): any {
    if (!usernames || !filter) {
      return usernames;
    }
    return usernames.filter(user => {
      return user.nickname.indexOf(filter) !== -1;
    });
  }
}
