import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggerInterceptor implements HttpInterceptor {
  private readonly loadingService = inject(LoadingService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({ headers: request.headers.set('accept-language', 'en-US') });
    console.log(request);

    this.loadingService.show();

    return next.handle(request).pipe(
      delay(500),
      finalize(() => this.loadingService.hide()),
    );
  }
}
