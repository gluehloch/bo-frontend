// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const bolocalhost = 'http://localhost:8080';
const nginxProxy = 'http://localhost:9999';

// const betoffice = 'betoffice-war/';
const betoffice = '/betoffice-boot/';
// const betofficeJWeb = 'betoffice-jweb_SNAP/'
// const betofficeJWeb = 'http://localhost:9999/betoffice-BOOT/';
const registrationservice = 'registrationservice/';

// const prefix = nginxProxy;

export const environment = {

    // Der alte Filter mit Zeitzone: 'dd.MM.yyyy HH:mm': '+0200'
    dateTimeFormat:      'dd.MM.yyyy HH:mm',
    // TODO Wird mit der Community Edition abgeschafft...
    currentSeasonId:     35,

    production:          false,
    rootUrl:             betoffice + 'office/',
    authenticationUrl:   betoffice + 'authentication/',
    adminUrl:            betoffice + 'chiefoperator/',
    communityAdminUrl:   betoffice + 'community-admin/',

    cookieserviceUrl:    registrationservice + 'cookie/confirmCookie',
    cookieAssetsUrl:     registrationservice + 'assets/',
    registerserviceUrl:  registrationservice + 'registration/register',
    // cookieserviceUrl:    'http://localhost:8080/registrationservice/cookie/confirmCookie',
    // cookieAssetsUrl:     'http://localhost:8080/registrationservice/assets/',
    // registerserviceUrl:  'http://localhost:8080/registrationservice/registration/register',

    website:             'andre-winkler.de.localhost',

};
