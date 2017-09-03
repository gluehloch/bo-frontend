import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { BetofficeService } from '../betoffice.service';

@Injectable()
export class SessionService extends BetofficeService {

  constructor(http: HttpClient) {
    super(http);
  }

}
