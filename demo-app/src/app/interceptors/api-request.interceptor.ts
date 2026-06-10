import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const request = req.clone({
            setHeaders: {
                'X-Requested-With': 'AngularDemoClient'
            }
        });

        return next.handle(request);
    }

    constructor() {
        console.log('ApiRequestInterceptor initialized');
    }
}
