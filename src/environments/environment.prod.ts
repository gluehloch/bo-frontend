const urlTippDieKisteBier = 'https://tippdiekistebier.de/betoffice-jweb/bo/';
const urlRegistrationService = 'https://tippdiekistebier.de/registrationservice/';

export const environment = {
    // Der alte Filter mit Zeitzone: 'dd.MM.yyyy HH:mm': '+0200'
    dateTimeFormat: 'dd.MM.yyyy HH:mm',
    // TODO Wird mit der Community Edition abgeschafft...
    currentSeasonId: 35,

    production:         true,
    website:            'tippdiekistebier.de',
    rootUrl:            urlTippDieKisteBier + 'office/',
    authenticationUrl:  urlTippDieKisteBier + 'authentication/',
    adminUrl:           urlTippDieKisteBier + 'chiefoperator/',
    communityAdminUrl:  urlTippDieKisteBier + 'community-admin/',
    registerserviceUrl: urlRegistrationService + 'registration/register',
    cookieserviceUrl:   urlRegistrationService + 'cookie/confirmCookie',
    cookieAssetsUrl:    urlRegistrationService + 'assets/',
};
