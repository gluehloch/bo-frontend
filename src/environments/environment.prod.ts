const urlBetoffice = '/betoffice-war/';
const urlRegistration = '/registrationservice/';

export const environment = {
    // Der alte Filter mit Zeitzone: 'dd.MM.yyyy HH:mm': '+0200'
    dateTimeFormat: 'dd.MM.yyyy HH:mm',
    // TODO Wird mit der Community Edition abgeschafft...
    currentSeasonId: 35,

    production:         true,
    website:            'tippdiekistebier.de',
    rootUrl:            urlBetoffice + 'office/',
    authenticationUrl:  urlBetoffice + 'authentication/',
    adminUrl:           urlBetoffice + 'chiefoperator/',
    communityAdminUrl:  urlBetoffice + 'community-admin/',
    registerserviceUrl: urlRegistration + 'registration/register',
    cookieserviceUrl:   urlRegistration + 'cookie/confirmCookie',
    cookieAssetsUrl:    urlRegistration + 'assets/',
};
