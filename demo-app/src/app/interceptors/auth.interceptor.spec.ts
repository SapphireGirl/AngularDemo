import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthInterceptor } from './auth.interceptor';

@Injectable()
class FakeAuthInterceptor extends AuthInterceptor { }

describe('AuthInterceptor', () => {
    let http: HttpClient;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: FakeAuthInterceptor,
                    multi: true
                }
            ]
        });

        http = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        controller.verify();
        localStorage.removeItem('token');
    });

    it('should NOT attach Authorization header when no token is stored', () => {
        localStorage.removeItem('token');

        http.get('/api/catalog/categories').subscribe();
        const req = controller.expectOne('/api/catalog/categories');

        expect(req.request.headers.has('Authorization')).toBeFalse();
        req.flush([]);
    });

    it('should attach Authorization header when token is stored', () => {
        localStorage.setItem('token', 'test-token-value');

        http.get('/api/catalog/categories').subscribe();
        const req = controller.expectOne('/api/catalog/categories');

        expect(req.request.headers.get('Authorization')).toBe('Bearer test-token-value');
        req.flush([]);
    });

    it('should NOT attach Authorization header on login requests even with a token', () => {
        localStorage.setItem('token', 'test-token-value');

        http.post('/api/auth/login', {}).subscribe();
        const req = controller.expectOne('/api/auth/login');

        expect(req.request.headers.has('Authorization')).toBeFalse();
        req.flush({ token: 'new-token', user: {} });
    });
});
