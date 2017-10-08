import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavigationRouterService {

  // Observable string sources
  private navigationSource = new Subject<string>();

  // Observable string streams
  navigationActivated$ = this.navigationSource.asObservable();

  // Service message commands
  activate(activatedRoute: string) {
    this.navigationSource.next(activatedRoute);
  }

}
