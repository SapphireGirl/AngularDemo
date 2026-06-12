import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorHandlingInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(`HTTP ${error.status} error on ${request.method} ${request.url}:`, error);
                // Re-throw the original HttpErrorResponse so subscribers (components, services)
                // can inspect status codes and server messages for specific error handling.
                return throwError(() => error);
            })
        );
    }
}