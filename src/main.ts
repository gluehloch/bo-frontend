import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);


// TODO Brauch ich das fuer das Material Design???
//import {platformBrowser} from '@angular/platform-browser';
//import {MaterialAppModuleNgFactory} from './aot/app/app.module.ngfactory';
//platformBrowser().bootstrapModuleFactory(MaterialAppModuleNgFactory);