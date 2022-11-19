// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {

    // Der alte Filter mit Zeitzone: 'dd.MM.yyyy HH:mm': '+0200'
    dateTimeFormat: 'dd.MM.yyyy HH:mm',
    // TODO Wird mit der Community Edition abgeschafft...
    currentSeasonId: 34,

    production: false,
    rootUrl: 'http://localhost:8080/betoffice-jweb/bo/office/',
    authenticationUrl: 'http://localhost:8080/betoffice-jweb/bo/authentication/',
    adminUrl: 'http://localhost:8080/betoffice-jweb/bo/chiefoperator/',
    cookieserviceUrl: 'http://localhost:9090/registrationservice/cookie/confirmCookie',
    // cookieserviceUrl: 'http://localhost:8080/registrationservice/cookie/confirmCookie',
    registerserviceUrl: 'http://localhost:9090/registrationservice/registration/register',
    // registerserviceUrl: 'http://localhost:8080/registrationservice/registration/register',

    // Laptop: 192.168.0.133 Mit Zugriff aus dem lokalen Netzwerk.
    /*
    rootUrl: 'http://192.168.0.133:8080/betoffice-jweb/bo/office/',
    adminUrl: 'http://192.168.0.133:8080/betoffice-jweb/bo/chiefoperator/',
    cookieserviceUrl: 'http://192.168.0.133:9090/registrationservice/cookie/confirmCookie',
    registerserviceUrl: 'http://192.168.0.133:9090/registrationservice/registration/register',
    authenticationUrl: 'http://192.168.0.133:8080/betoffice-jweb/bo/authentication/',
    */

    website: 'andre-winkler.de.localhost'

};
