import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { HttpInterceptService } from './services/http-intercept.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptService},
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService}

  ]
};
