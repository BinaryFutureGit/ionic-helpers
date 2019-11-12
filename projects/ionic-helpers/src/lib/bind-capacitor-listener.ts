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

import { PluginListenerHandle } from "@capacitor/core";
import { Observable } from "rxjs";

/**
 * This is a small utility to convert a capacitor listener into an Observable.
 *
 * Note that the TypeScript definitions are a work in progress. I've done the
 * nest I can, but it is necessary to manually infer the return type of the
 * listener in most circumstances as TypeScript can't infer the return type
 * automatically based on the event name.
 *
 * @param addListenerFn capacitor listener function reference
 * @param eventName the event name
 * @example
 * ```
 * import { bindCapacitorListener } from "@binary/ionic-utils"
 * import { Plugins, PushNotification } from "@capacitor/core";
 *
 * const { PushNotifications } = Plugins;
 *
 * const pushNotificationReceived$ = bindCapacitorListener<PushNotification>(
 *   PushNotifications.addListener,
 *   "pushNotificationReceived"
 * );
 *
 * pushNotificationReceived$.subscribe(notification => {
 *   console.log("push notification received", notification);
 * });
 *
 * ```
 */
export function bindCapacitorListener<ReturnVal>(
  addListenerFn: (
    ev: string,
    cb: (result: ReturnVal) => void
  ) => PluginListenerHandle,
  eventName: string
): Observable<ReturnVal>;
export function bindCapacitorListener<EventName, ReturnVal>(
  addListenerFn: (
    ev: EventName,
    cb: (result: ReturnVal) => void
  ) => PluginListenerHandle,
  eventName: EventName
): Observable<ReturnVal> {
  return new Observable<ReturnVal>(observer => {
    const listener = addListenerFn(eventName, result => observer.next(result));
    return () => listener.remove();
  });
}
