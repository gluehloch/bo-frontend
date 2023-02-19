import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';

import { NavigationRouterService } from './navigationrouter.service';

import { NavbarComponent } from './navbar/navbar.component';

import { UsernameFilter } from './pipe/usernamefilter';
import { ModalService } from './modal/modal.service';

import { HomeService } from './home/home.service';
import { HomeComponent } from './home/home.component';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationService } from './registration/registration.service';
import { RegistrationComponent } from './registration/registration.component';

import { AuthenticationWarningComponent } from './authenticationwarning/authenticationwarning.component';

import { GameResultComponent } from './shared/gameresult/gameresult.component';
import { PagerComponent } from './shared/pager/pager.component';

import { TippSelectorComponent } from './tipp/selector/tipp-selector.component';
import { TippService } from './tipp/tipp.service';
import { TippComponent } from './tipp/tipp.component';
import { TippSmallComponent } from './tipp/tipp-small.component';
import { TippMobileComponent} from './tipp/tipp-mobile.component';

import { SeasonService } from './season/season.service';
import { SeasonComponent } from './season/season.component';

import { TippResultComponent } from './ranking/tippresult.component';
import { RankingService } from './ranking/ranking.service';
import { RankingComponent } from './ranking/ranking.component';

import { SessionService } from './session/session.service';

import { PartyService } from './party/party.service';
import { PartyComponent } from './party/party.component';
import { PartyUpdateService } from './party/update/partyupdate.service';
import { PartyUpdateComponent } from './party/update/partyupdate.component';

import { TeamComponent } from './team/team.component';
import { TeamService } from './team/team.service';
import { TeamUpdateComponent } from './team/update/teamupdate.component';
import { TeamUpdateService } from './team/update/teamupdate.service';
import { TeamFilter } from './team/teamFilter.pipe';

import { SeasonManagerService } from './seasonmanager/seasonmanager.service';
import { SeasonManagerComponent } from './seasonmanager/seasonmanager.component';
import { SeasonManagerUpdateService } from './seasonmanager/update/seasonmanagerupdate.service';
import { SeasonManagerUpdateComponent } from './seasonmanager/update/seasonmanagerupdate.component';
import { SeasonManagerCreateService } from './seasonmanager/create/seasonmanagercreate.service';
import { SeasonManagerCreateComponent } from './seasonmanager/create/seasonmanagercreate.component';

import { UpdateMatchdayService } from './seasonmanager/updatematchday/updatematchday.service';
import { UpdateMatchdayComponent } from './seasonmanager/updatematchday/updatematchday.component';

import { UpdateMatchService } from './seasonmanager/updatematch/updatematch.service';
import { UpdateMatchComponent } from './seasonmanager/updatematch/updatematch.component';

import { CookieService } from './app.cookie.service';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommunityAdminComponent } from './admin/community/communityadmin.component';
import { CommunityAdminService } from './admin/community/communityadmin.service';
import { AdministrationCanActivate } from './session/administration.canactivate';
import { UserCanActivate } from './session/user.canactivate';
import { httpInterceptorProviders } from './interceptors';

const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: 'tippdiekistebier.de'
    },
    position: 'top-right',
    palette: {
        popup: {
            'background': '#2b482a',
            'text': '#ffffff',
            'link': '#ffffff'
        },
        button: {
            'background': '#bfc418',
            'text': '#000000',
            'border': 'transparent'
        }
    },
    theme: 'edgeless',
    type: 'opt-out',
    content: {
        message: 'Diese Webseite verwendet Cookies.',
        dismiss: 'Verstanden',
        deny: 'Verweigern',
        allow: 'Erlauben',
        link: 'Mehr Infos',
        href: 'http://tippdiekistebier.de/impressum',
        target: '',
        policy: 'Cookie Policy'
    }
};

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'https://cookie.gluehloch.de/assets/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CookieModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule.forRoot([
            /*
            {
              path: '',
              redirectTo: 'home'
            },*/
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'register',
                component: RegistrationComponent
            },
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
                component: TippComponent,
                canActivate: [UserCanActivate]
            },
            {
                path: 'tipp-small',
                component: TippSmallComponent,
                canActivate: [UserCanActivate]
            },
            {
                path: 'tipp-mobile',
                component: TippMobileComponent,
                canActivate: [UserCanActivate]
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
                component: PartyComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/party/update/:id',
                component: PartyUpdateComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/team',
                component: TeamComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/team/update/:id',
                component: TeamUpdateComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/seasonmanager',
                component: SeasonManagerComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/seasonmanager/create',
                component: SeasonManagerCreateComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/seasonmanager/update/:id',
                component: SeasonManagerUpdateComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/seasonmanager/updatematchday',
                component: UpdateMatchdayComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/seasonmanager/updatematch',
                component: UpdateMatchComponent,
                canActivate: [AdministrationCanActivate]
            },
            {
                path: 'chiefop/community',
                component: CommunityAdminComponent,
                canActivate: [AdministrationCanActivate]
            }
        ])
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        UsernameFilter,
        HomeComponent,
        AuthenticationWarningComponent,
        AuthenticationComponent,
        RegistrationComponent,
        GameResultComponent,
        PagerComponent,
        TippSelectorComponent,
        TippComponent,
        TippSmallComponent,
        TippMobileComponent,
        SeasonComponent,
        TippResultComponent,
        RankingComponent,
        PartyComponent,
        PartyUpdateComponent,
        TeamComponent,
        TeamUpdateComponent,
        TeamFilter,
        SeasonManagerComponent,
        SeasonManagerUpdateComponent,
        SeasonManagerCreateComponent,
        UpdateMatchdayComponent,
        UpdateMatchComponent,
        CommunityAdminComponent,
    ],
    providers: [
        httpInterceptorProviders,
        AdministrationCanActivate,
        UserCanActivate,
        CookieService,
        HomeService,
        NavigationRouterService,
        AuthenticationService,
        SessionService,
        RegistrationService,
        TippService,
        SeasonService,
        RankingService,
        SeasonService,
        PartyService,
        PartyUpdateService,
        TeamService,
        TeamUpdateService,
        SeasonManagerService,
        SeasonManagerUpdateService,
        SeasonManagerCreateService,
        UpdateMatchdayService,
        UpdateMatchService,
        CommunityAdminService,
        ModalService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
