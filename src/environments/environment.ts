// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {

    production: true,
    // rootUrl: 'http://localhost:8080/betoffice-jweb/bo/office/',
    // adminUrl: 'http://localhost:8080/betoffice-jweb/bo/chiefoperator/',

    website: 'andre-winkler.de.localhost',
    cookieserviceUrl: 'http://192.168.99.101:9090/registrationservice/cookie/confirmCookie',
    // cookieserviceUrl: 'https://cookie.gluehloch.de/registrationservice/cookie/confirmCookie',
    registerserviceUrl: 'http://192.168.99.101:9090/registrationservice/registration/register',

    rootUrl: 'http://192.168.99.101:8080/betoffice-jweb/bo/office/',
    adminUrl: 'http://192.168.99.101:8080/betoffice-jweb/bo/chiefoperator/',

    // Production:
    // rootUrl: 'https://tippdiekistebier.de/betoffice-jweb/bo/office/',
    // adminUrl: 'https://tippdiekistebier.de/betoffice-jweb/bo/chiefoperator/',
    // website: 'andre-winkler.de.localhost',
    // website: 'tippdiekistebier.de',
    // cookieserviceUrl: 'http://192.168.99.101:9090/registrationservice/cookie/confirmCookie',
    // cookieserviceUrl: 'https://cookie.gluehloch.de/registrationservice/cookie/confirmCookie',

    // rootUrl: 'http://192.168.99.101:8080/betoffice-jweb/bo/office/',
    // adminUrl: 'http://192.168.99.101:8080/betoffice-jweb/bo/chiefoperator/',

    // rootUrl: 'http://192.168.0.110:8080/betoffice-jweb/bo/office/',
    // adminUrl: 'http://192.168.0.110:8080/betoffice-jweb/bo/chiefoperator/',

    // Der wacken2016/stauder PC
    // rootUrl: 'http://192.168.0.136:8080/betoffice-jweb/bo/office/',
    // adminUrl: 'http://192.168.0.136:8080/betoffice-jweb/bo/chiefoperator/',
    // Laptop (W550s) IP Adresse: 192.168.0.110

    // rootUrl: 'https://tippdiekistebier.de/betoffice-jweb/bo/office/',
    // adminUrl: 'https://tippdiekistebier.de/betoffice-jweb/bo/chiefoperator/',
    currentSeasonId: 29

};
