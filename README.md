# Ionic Helpers

This is a small collection of utilities that we use on every Ionic Capacitor/Cordova project.

1. [wrapInZone](#wrapInZone)
1. [bindCapacitorListener](#bindCapacitorListener)

## More Info

Please see the library [README](/projects/ionic-helpers/README.md)

## [wrapInZone](/projects/ionic-helpers/README.md#wrapInZone)

`wrapInZone` is a pipeable RXJS operator that is used to ensure that and value emissions are wrapped in angular NgZone and can trigger change detection as expected.

[Refer to the source for documentation and example usage](/projects/ionic-helpers/src/lib/wrap-in-zone.ts).

## [bindCapacitorListener](/projects/ionic-helpers/README.md#bindCapacitorListener)

`bindCapacitorListener` is a simple function to create an RXJS Observable from a Capacitor Event Listener. This allows you to use the power of RXJS to combine, mutate and interact with these events.

[Refer to the source for documentation and example usage](/projects/ionic-helpers/src/lib/bind-capacitor-listener.ts).

## Who are we?

[Binary](https://binary.com.au) are a company specialising in App & Web Development. We've been building Ionic/Angular apps and are available to help you with your app with code review, troubleshooting, development or more. Get in contact with us at [binary.com.au](https://binary.com.au).
