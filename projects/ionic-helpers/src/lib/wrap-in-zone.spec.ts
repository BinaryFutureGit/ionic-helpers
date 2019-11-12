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

import { from, EMPTY, throwError } from "rxjs";
import { wrapInZone } from "./wrap-in-zone";
import { NgZone } from "@angular/core";

class MockNgZone {
  run(cb: () => void) {
    cb();
  }
}

describe("wrapInZone", () => {
  let mockZone: MockNgZone;

  beforeEach(() => {
    mockZone = new MockNgZone();
  });

  it("should correctly emit all values from the original observable", done => {
    const expectedValue = 1;
    const observable = from([expectedValue]);

    observable.pipe(wrapInZone(mockZone as NgZone)).subscribe({
      next: val => {
        expect(val).toEqual(expectedValue);
        done();
      },
    });
  });

  it("should execute emissions wrapped in zone", done => {
    const observable = from([1]);

    spyOn(mockZone, "run").and.callThrough();

    observable.pipe(wrapInZone(mockZone as NgZone)).subscribe({
      next: val => {
        expect(mockZone.run).toHaveBeenCalled();
        done();
      },
    });
  });

  it("should wrap the completion handler in zone", done => {
    spyOn(mockZone, "run").and.callThrough();

    EMPTY.pipe(wrapInZone(mockZone as NgZone)).subscribe({
      complete: () => {
        expect(mockZone.run).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });

  it("should wrap the error handler in zone", done => {
    spyOn(mockZone, "run").and.callThrough();

    throwError("An Error")
      .pipe(wrapInZone(mockZone as NgZone))
      .subscribe({
        error: () => {
          expect(mockZone.run).toHaveBeenCalledTimes(1);
          done();
        },
      });
  });

  it("should call the error handler with the error value", done => {
    const expectedError = "An Error";

    throwError(expectedError)
      .pipe(wrapInZone(mockZone as NgZone))
      .subscribe({
        error: error => {
          expect(error).toEqual(expectedError);
          done();
        },
      });
  });
});
