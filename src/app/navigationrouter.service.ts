import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavigationRouterService {

  // Observable string sources
  private navigationSource = new Subject<string>();
  private sessionSource = new Subject<string>();

  // Observable string streams
  navigationActivated$ = this.navigationSource.asObservable();
  sessionSource$ = this.sessionSource.asObservable();

  // Service message commands
  activate(activatedRoute: string) {
    this.navigationSource.next(activatedRoute);
  }

  login() {
    this.sessionSource.next('login');
  }

  logout() {
    this.sessionSource.next('logout');
  }
 
}
