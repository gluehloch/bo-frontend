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

// TODO Injectable
let rootUrl = 'http://localhost:8080/betoffice-jweb/bo/office/';

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
    RankingComponent
  ],
  providers: [
    AuthenticationService,
    TippService,
    SeasonService,
    RankingService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
