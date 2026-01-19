import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerInterceptor } from './app/core/interceptors/logger.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule),
  ],
}).catch((err) => console.error(err));
