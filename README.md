# Testangie

Momentan arbeitet diese Projekt mit angular-cli 1.4.7. Um alte Resistanten los zu werden, empfiehlt es
sich, die folgenden Befehle auszuführen:

Falls noch eine alte BETA Version vorhanden ist:

```
npm uninstall -g angular-cli
npm uninstall --save-dev angular-cli
```
Ansonsten angular-cli aus dem globalen Namensraum entfernen:
```
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
```
Und um die neueste Version in das Projekt einzubinden:
```
rm -rf node_modules dist # use rmdir on Windows
npm install --save-dev @angular/cli@latest
npm install
```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
