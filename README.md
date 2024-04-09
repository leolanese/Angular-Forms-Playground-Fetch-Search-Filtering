# Angular Search and filtering, using stand-alone Components, Observables and Subject

> The first solution uses a Pipe, template with ngModel, ngModelOnChange, 2-way-binding [()]

> the second uses template reference variable (#), event-binding ()

> both uses Subject, Observables and | async pipe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

```js
ng new Angular-Search-Filtering

npm i
npm i bootstrap
```

```js
// package.json
"styles": [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "src/styles.scss"
]
```

```js
ng g s services/country

// later on exploring the Entity Pattern
```

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
