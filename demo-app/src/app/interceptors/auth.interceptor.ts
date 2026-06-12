import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const isLoginRequest = request.url.includes('/auth/login');

        if (!token || isLoginRequest) {
            return next.handle(request);
        }

        const modifiedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(modifiedRequest);
    }
}