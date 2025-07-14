const betoffice = '/betoffice-war/';
const urlRegistration = '/registrationservice/';

export const environment = {
    // Der alte Filter mit Zeitzone: 'dd.MM.yyyy HH:mm': '+0200'
    dateTimeFormat: 'dd.MM.yyyy HH:mm',
    // TODO Wird mit der Community Edition abgeschafft...
    currentSeasonId: 38,

    production:         true,
    website:            'tippdiekistebier.de',
    rootUrl:            betoffice + 'office/',
    authenticationUrl:  betoffice + 'authentication/',
    adminUrl:           betoffice + 'chiefoperator/',
    communityAdminUrl:  betoffice + 'community-admin/',
    registerserviceUrl: urlRegistration + 'registration/register',
    cookieserviceUrl:   urlRegistration + 'cookie/confirmCookie',
    cookieAssetsUrl:    urlRegistration + 'assets/',
};
