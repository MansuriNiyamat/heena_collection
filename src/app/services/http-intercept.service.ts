import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorLogsService } from './error-logs.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptService implements HttpInterceptor {
log = inject(ErrorLogsService)
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((err:HttpErrorResponse)=>{
          this.log.openSnackBar('Somwthing went wrong... ')
          return throwError(err)
        })
      )
  }
}
