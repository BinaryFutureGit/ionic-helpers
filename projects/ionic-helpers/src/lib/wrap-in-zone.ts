/**
 * Copyright 2019 James Manners, Binary Solutions Pty Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { NgZone } from "@angular/core";
import { Observable } from "rxjs";

/**
 * A pipeable operator to wrap an observer in an angular zone This is useful for
 * observers such as cordova or capacitor callbacks which get executed outside
 * of a ngZone which in turn causes change detection problems
 *
 * References:
 * https://github.com/ReactiveX/rxjs/blob/master/doc/operator-creation.md#operator-as-a-pure-function
 * https://stackoverflow.com/a/37596783/251352
 * https://medium.com/@naveen.kr/rxjs-custom-pipeable-operator-to-run-asynchronous-callbacks-inside-angular-zone-a49bd71c0bf6
 *
 * @param zone the ngZone in which to execute the observable in
 * @example
 * ```
 * constructor(private ngZone:NgZone, private geolocation: Geolocation){
 *  this.location$ = this.geolocation.watchPosition.pipe(wrapInZone(this.ngZone))
 * }
 * ```
 */
export function wrapInZone(zone: NgZone) {
  return <T>(source: Observable<T>) =>
    new Observable<T>(observer =>
      source.subscribe({
        next: x => zone.run(() => observer.next(x)),
        error: err => zone.run(() => observer.error(err)),
        complete: () => zone.run(() => observer.complete()),
      })
    );
}
