# Ionic Helpers

This is a small collection of utilities that we use on every Ionic Capacitor/Cordova project.

1. [wrapInZone](#wrapInZone)
1. [bindCapacitorListener](#bindCapacitorListener)

## wrapInZone

`wrapInZone` is a pipeable RXJS operator that is used to ensure that and value emissions are wrapped in angular NgZone and can trigger change detection as expected.

[Refer to the source for documentation and example usage](src/lib/wrap-in-zone.ts).

### Background

Angular change detection works by monkey patching many browser APIs including fetch/promise/HttpXMLRequest and others.

When deploying an angular application in [Capacitor](https://capacitor.ionicframework.com) or [Cordova](https://cordova.org) applications it is common to use native APIs that should update the UI (such as Geolocation updates, Push Notifications, Clipboard etc...). Angular doesn't not patch these APIs and hence when doesn't trigger the UI to update when these events fire. What often happens is that you notice the UI not updating, but it will change if you click on another element. By interacting with the app, you trigger change detection to run and the UI gets updated. This only occurs for event listeners or observables. APIs that return a promise often work as expected as angular automatically wraps all Promise calls to trigger change detection.

## bindCapacitorListener

`bindCapacitorListener` is a simple function to create an RXJS Observable from a Capacitor Event Listener. This allows you to use the power of RXJS to combine, mutate and interact with these events.

[Refer to the source for documentation and example usage](src/lib/bind-capacitor-listener.ts).

### Background

[Ionic Native](https://ionicframework.com/docs/native) provides fantastic wrappers when using Cordova Plugins in an Angular app. This includes wrapping many event listeners as Observables. We are increasingly using [Capacitor](https://capacitor.ionicframework.com) to create our apps. I found that we were manually wrapping each `addListener` call to create an Observable. This utility automatically does this. It also allows the event listener to be removed when the Observable is completed, preventing memory leaks.

Once it is an Observable, it can also be used with [wrapInZone](#wrapInZone) to make sure it plays nicely with Angular Change Detection.

_Note:_ Currently it is necessary to type the return value of the call to `addListener`. Typescript doesn't correctly infer the return value unless manually set. If anyone knows how to improve this, please create a PR.

## Installation

_Note:_ `@capacitor/core` is included as an optionalDependency as it is required for `bindCapacitorListener`, but if you are only using `wrapInZone` you don't need Capacitor.

- `npm install @binary-dev/ionic-helpers`

or

- `yan install @binary-dev/ionic-helpers`

## Who are we?

[Binary](https://binary.com.au) are a company specialising in App & Web Development. We've been building Ionic/Angular apps and are available to help you with your app with code review, troubleshooting, development or more. Get in contact with us at [binary.com.au](https://binary.com.au).

## Development Notes

### To Do List

- [ ] Add Tests
- [ ] Improve Typescript Declaration for `bindCapacitorListener` to allow TypeScript to automatically infer result from the event name. Currently it is best to manually type the return value.

### Code scaffolding

Run `ng generate component component-name --project ionic-helpers` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ionic-helpers`.

> Note: Don't forget to add `--project ionic-helpers` or else it will be added to the default project in your `angular.json` file.

### Build

Run `ng build ionic-helpers` to build the project. The build artifacts will be stored in the `dist/` directory.

### Publishing

After building your library with `ng build ionic-helpers`, go to the dist folder `cd dist/ionic-helpers` and run `npm publish`.

### Running unit tests

Run `ng test ionic-helpers` to execute the unit tests via [Karma](https://karma-runner.github.io).
