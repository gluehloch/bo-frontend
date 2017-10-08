import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

// import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { RouterModule, Router } from '@angular/router';

import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';

import { NavigationRouterService } from './navigationrouter.service';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationComponent } from './authentication/authentication.component';

import { TippService } from './tipp/tipp.service';
import { TippComponent } from './tipp/tipp.component';
import { TippSmallComponent } from './tipp/tipp-small.component';

import { SeasonService } from './season/season.service';
import { SeasonComponent } from './season/season.component';

import { RankingService } from './ranking/ranking.service';
import { RankingComponent } from './ranking/ranking.component';

import { SessionService } from './session/session.service';
import { SessionComponent } from './session/session.component';

import { PartyService } from './party/party.service';
import { PartyComponent } from './party/party.component';
import { PartyUpdateService } from './party/update/partyupdate.service';
import { PartyUpdateComponent } from './party/update/partyupdate.component';

import { SeasonManagerService } from './seasonmanager/seasonmanager.service';
import { SeasonManagerComponent } from './seasonmanager/seasonmanager.component';
import { SeasonManagerUpdateService } from './seasonmanager/update/seasonmanagerupdate.service';
import { SeasonManagerUpdateComponent } from './seasonmanager/update/seasonmanagerupdate.component';
import { SeasonManagerCreateService } from './seasonmanager/create/seasonmanagercreate.service';
import { SeasonManagerCreateComponent } from './seasonmanager/create/seasonmanagercreate.component';
import { UpdateMatchdayService } from './seasonmanager/updatematchday/updatematchday.service';
import { UpdateMatchdayComponent } from './seasonmanager/updatematchday/updatematchday.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot([/*{
        path: '',
        redirectTo: 'dashboard',
        component: DashboardComponent
      },*/
      {
        path: 'login',
        component: AuthenticationComponent
      },
      {
        path: 'logout',
        component: AuthenticationComponent
      },
      /* TODO Anzeige der Login/Logout Daten inklusive Tippzeitpunkte.
      {
        path: 'session',
        component: SessionComponent
      },
      */
      {
        path: 'tipp',
        component: TippComponent
      },
      {
        path: 'tipp-small',
        component: TippSmallComponent
      },
      {
        path: 'ranking',
        component: RankingComponent
      },
      {
        path: 'season',
        component: SeasonComponent
      },
      {
        path: 'chiefop/party',
        component: PartyComponent
      },
      {
        path: 'chiefop/party/update/:id',
        component: PartyUpdateComponent
      },
      {
        path: 'chiefop/seasonmanager',
        component: SeasonManagerComponent
      },
      {
        path: 'chiefop/seasonmanager/create',
        component: SeasonManagerCreateComponent
      },
      {
        path: 'chiefop/seasonmanager/update/:id',
        component: SeasonManagerUpdateComponent
      },
      {
        path: 'chiefop/seasonmanager/updatematchday/:id',
        component: UpdateMatchdayComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    AuthenticationComponent,
    TippComponent,
    TippSmallComponent,
    SeasonComponent,
    RankingComponent,
    SessionComponent,
    PartyComponent,
    PartyUpdateComponent,
    SeasonManagerComponent,
    SeasonManagerUpdateComponent,
    SeasonManagerCreateComponent,
    UpdateMatchdayComponent
  ],
  providers: [
    AuthenticationService,
    TippService,
    SeasonService,
    RankingService,
    SeasonService,
    PartyService,
    PartyUpdateService,
    SeasonManagerService,
    SeasonManagerUpdateService,
    SeasonManagerCreateService,
    UpdateMatchdayService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
