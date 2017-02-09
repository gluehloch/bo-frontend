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
      }
    ])
  ],
  declarations: [
    AppComponent,
    AuthenticationComponent,
    TippComponent
  ],
  providers: [AuthenticationService, TippService],
  bootstrap: [AppComponent]
})

export class AppModule { }
