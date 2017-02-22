import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationComponent } from './authentication/authentication.component';

import { TippService } from './tipp/tipp.service';
import { TippComponent } from './tipp/tipp.component';

import { SeasonService } from './season/season.service';
import { SeasonComponent } from './season/season.component';

import { RankingService } from './ranking/ranking.service';
import { RankingComponent } from './ranking/ranking.component';

import { SessionService } from './session/session.service';
import { SessionComponent } from './session/session.component';

@NgModule({
  imports: [
    BrowserModule,
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
        path: 'ranking',
        component: RankingComponent
      },
      {
        path: 'season',
        component: SeasonComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    AuthenticationComponent,
    TippComponent,
    SeasonComponent,
    RankingComponent,
    SessionComponent
  ],
  providers: [
    AuthenticationService,
    TippService,
    SeasonService,
    RankingService,
    SeasonService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
