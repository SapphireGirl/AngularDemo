import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlingInterceptor } from './error-handling.interceptor';

describe('ErrorHandlingInterceptor', () => {
    let http: HttpClient;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorHandlingInterceptor,
                    multi: true
                }
            ]
        });

        http = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        controller.verify();
    });

    it('should pass through successful responses unchanged', () => {
        let result: any;
        http.get('/api/catalog/categories').subscribe(r => (result = r));

        controller.expectOne('/api/catalog/categories').flush([{ id: 1 }]);

        expect(result).toEqual([{ id: 1 }]);
    });

    it('should re-throw the original HttpErrorResponse on error', () => {
        let caughtError: any;
        http.get('/api/catalog/categories').subscribe({
            error: err => (caughtError = err)
        });

        controller
            .expectOne('/api/catalog/categories')
            .flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

        expect(caughtError instanceof HttpErrorResponse).toBeTrue();
        expect(caughtError.status).toBe(401);
    });

    it('should log the error to the console', () => {
        const consoleSpy = spyOn(console, 'error');
        http.get('/api/catalog/categories').subscribe({ error: () => {} });

        controller
            .expectOne('/api/catalog/categories')
            .flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });

        expect(consoleSpy).toHaveBeenCalled();
    });
});
