import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
        path: 'login',
        component: AuthenticationComponent
    }]),
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
