import './polyfills';

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import { CommunityAdminComponent } from './app/admin/community/communityadmin.component';
import { CommunityUpdateComponent } from './app/admin/community/update/communityupdate.component';

import { UpdateMatchComponent } from './app/seasonmanager/updatematch/updatematch.component';
import { UpdateTeamGroupComponent } from './app/seasonmanager/updateteamgroup/updateteamgroup.component';
import { UpdateMatchdayComponent } from './app/seasonmanager/updatematchday/updatematchday.component';
import { SeasonManagerUpdateComponent } from './app/seasonmanager/update/seasonmanagerupdate.component';
import { SeasonManagerCreateComponent } from './app/seasonmanager/create/seasonmanagercreate.component';
import { SeasonManagerComponent } from './app/seasonmanager/seasonmanager.component';
import { TeamUpdateComponent } from './app/team/update/teamupdate.component';
import { TeamComponent } from './app/team/team.component';
import { PartyUpdateComponent } from './app/party/update/partyupdate.component';
import { PartyComponent } from './app/party/party.component';

import { SeasonComponent } from './app/season/season.component';
import { RankingComponent } from './app/ranking/ranking.component';
import { TippMobileComponent } from './app/tipp/tipp-mobile.component';
import { TippSmallComponent } from './app/tipp/tipp-small.component';
import { TippComponent } from './app/tipp/tipp.component';
import { AuthenticationComponent } from './app/authentication/authentication.component';
import { RegistrationComponent } from './app/registration/registration.component';
import { HomeComponent } from './app/home/home.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ModalService } from './app/modal/modal.service';
import { CommunityAdminService } from './app/admin/community/communityadmin.service';
import { UpdateMatchService } from './app/seasonmanager/updatematch/updatematch.service';
import { UpdateMatchdayService } from './app/seasonmanager/updatematchday/updatematchday.service';
import { UpdateSeasonGroupTeamService } from './app/seasonmanager/updateteamgroup/updateteamgroup.service';
import { SeasonManagerCreateService } from './app/seasonmanager/create/seasonmanagercreate.service';
import { SeasonManagerUpdateService } from './app/seasonmanager/update/seasonmanagerupdate.service';
import { SeasonManagerService } from './app/seasonmanager/seasonmanager.service';
import { TeamUpdateService } from './app/team/update/teamupdate.service';
import { TeamService } from './app/team/team.service';
import { PartyUpdateService } from './app/party/update/partyupdate.service';
import { PartyService } from './app/party/party.service';
import { RankingService } from './app/ranking/ranking.service';
import { SeasonService } from './app/season/season.service';
import { TippService } from './app/tipp/tipp.service';
import { RegistrationService } from './app/registration/registration.service';
import { SessionService } from './app/session/session.service';
import { AuthenticationService } from './app/authentication/authentication.service';
import { NavigationRouterService } from './app/navigationrouter.service';
import { HomeService } from './app/home/home.service';
import { GoalsService } from './app/shared/goals/goals.service';
import { CookieService } from './app/app.cookie.service';
import { UserCanActivate } from './app/session/user.canactivate';
import { AdministrationCanActivate } from './app/session/administration.canactivate';
import { httpInterceptorProviders } from './app/interceptors';
import { CommunityUpdateService } from './app/admin/community/update/communityupdate.service';
import { ResearchService } from './app/research/research.service';
import { ResearchComponent } from './app/research/research.component';
import { ProfileService } from './app/profile/profile.service';
import { ProfileComponent } from './app/profile/profile.component';
import { ProfileConfirmComponent } from './app/profile/profile-confirm.component';
import { ResponsiveService } from './app/shared/responsive.service';
import { UserPreferenceService } from './app/shared/user-preference.service';


if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
        ),
        httpInterceptorProviders,
        AdministrationCanActivate,
        UserCanActivate,
        CookieService,
        GoalsService,
        HomeService,
        NavigationRouterService,
        AuthenticationService,
        SessionService,
        RegistrationService,
        TippService,
        SeasonService,
        RankingService,
        ResearchService,
        SeasonService,
        PartyService,
        PartyUpdateService,
        ProfileService,
        TeamService,
        TeamUpdateService,
        SeasonManagerService,
        SeasonManagerUpdateService,
        SeasonManagerCreateService,
        UpdateSeasonGroupTeamService,
        UpdateMatchdayService,
        UpdateMatchService,
        CommunityAdminService,
        CommunityUpdateService,
        ResponsiveService,
        UserPreferenceService,
        ModalService,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([
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
                path: 'research',
                component: ResearchComponent
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [UserCanActivate]
            },
            {
                path: 'profile-confirm/:confirmationToken',
                component: ProfileConfirmComponent,
                canActivate: [UserCanActivate]
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
                path: 'chiefop/seasonmanager/updateteamgroup/:id',
                component: UpdateTeamGroupComponent,
                canActivate: [AdministrationCanActivate],
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
            },
            {
                path: 'chiefop/community/update/:id',
                component: CommunityUpdateComponent,
                canActivate: [AdministrationCanActivate]
            }
        ], withComponentInputBinding())
    ]
})
    .catch(err => console.log(err));
