import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ErrorLogsService } from './error-logs.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  log = inject(ErrorLogsService)
  constructor() { }
  handleError(error: any): void {
      this.log.openSnackBar('Something went wrong..')
  }
}
