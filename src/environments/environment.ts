// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {

    // Der alte Filter mit Zeitzone: 'dd.MM.yyyy HH:mm': '+0200'
    dateTimeFormat: 'dd.MM.yyyy HH:mm',
    // TODO Wird mit der Community Edition abgeschafft...
    currentSeasonId: 30,

    production: false,
    // rootUrl: 'http://localhost:8080/betoffice-jweb/bo/office/',
    // adminUrl: 'http://localhost:8080/betoffice-jweb/bo/chiefoperator/',
    // cookieserviceUrl: 'http://localhost:9090/registrationservice/cookie/confirmCookie',

    rootUrl: 'http://192.168.0.101:8080/betoffice-jweb/bo/office/',
    adminUrl: 'http://192.168.0.101:8080/betoffice-jweb/bo/chiefoperator/',
    cookieserviceUrl: 'http://192.168.0.101:9090/registrationservice/cookie/confirmCookie',

    website: 'andre-winkler.de.localhost'

    /*
    production: true,
    website: 'tippdiekistebier.de',
    rootUrl: 'https://tippdiekistebier.de/betoffice-jweb/bo/office/',
    adminUrl: 'https://tippdiekistebier.de/betoffice-jweb/bo/chiefoperator/',
    cookieserviceUrl: 'https://cookie.gluehloch.de/registrationservice/cookie/confirmCookie'
    */

};
