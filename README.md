# Healus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

## Pangea API Use
The Whole Authentiation and Authorization is build around [Pangea Authn API ](https://pangea.cloud/docs/api/authn) that is When Signup as Square Customer we use the same Profile for [Pangea Authn API Sign up ](https://pangea.cloud/docs/api/authn).
All this links Use Pangea API:
[Selfcare SignUP](https://healus-assurance.web.app/#/selfcare/auth/signup),
[Selfcare SignIN](https://healus-assurance.web.app/#/selfcare/auth/signin),
[Selfcare Reset Password](https://healus-assurance.web.app/#/selfcare/auth/reset-password),
[Selfcare Logout](https://healus-assurance.web.app/#/selfcare),

[Admin SignUP](https://healus-assurance.web.app/#/admin/auth/signup),
[Admin SignIN](https://healus-assurance.web.app/#/admin/auth/signin),
[Admin Reset Password](https://healus-assurance.web.app/#/admin/auth/reset-password),
[Admin Logout](https://healus-assurance.web.app/#/admin)

90% of [Healus Admin](https://healus-assurance.web.app/#/admin) actions are saved using [Pangea Secure Audit log](https://pangea.cloud/docs/api/audit).
and also when a customer subscribes to a package its logged as well.

Also both Customers and admin users can now use [Pangea User Intel](https://pangea.cloud/docs/api/user-intel) to find out if their email addresses have been exposed to any security breach
