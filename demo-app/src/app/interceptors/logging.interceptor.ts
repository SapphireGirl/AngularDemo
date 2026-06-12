import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = request.clone({ setHeaders: { 'X-Request-ID': '123' } });
        console.log('Request:', modifiedRequest);

        return next.handle(modifiedRequest).pipe(
            tap(response => console.log('Response:', response))
        );
    }
}   