// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    // rootUrl: 'http://localhost:8080/betoffice-jweb/bo/office/',
    // adminUrl: 'http://localhost:8080/betoffice-jweb/bo/chiefoperator/',

    website: 'andre-winkler.de.localhost',
    cookieserviceUrl: 'http://192.168.99.101:9090/registrationservice/cookie/confirmCookie',
    registerserviceUrl: 'http://192.168.99.101:9090/registrationservice/registration/register',

    rootUrl: 'http://192.168.99.101:8080/betoffice-jweb/bo/office/',
    adminUrl: 'http://192.168.99.101:8080/betoffice-jweb/bo/chiefoperator/',

    currentSeasonId: 29
};
