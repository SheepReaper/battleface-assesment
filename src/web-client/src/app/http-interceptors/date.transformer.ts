import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateTransformer implements HttpInterceptor {
  private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;

  isIsoDateString(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return this._isoDateFormat.test(value);
    }

    return false;
  }

  convertDateStringsToDate(body: any) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    Object.keys(body).map((key) => {
      const value = body[key];

      if (this.isIsoDateString(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        this.convertDateStringsToDate(value);
      }
    });
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(['checking', httpRequest.method]);
    return next.handle(httpRequest).pipe(
      map((val) => {
        if (val instanceof HttpResponse) {
          const body = val.body;
          this.convertDateStringsToDate(body);
        }

        return val;
      })
    );
  }
}
