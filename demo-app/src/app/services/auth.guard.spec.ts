import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGuard } from './auth.guard';
import { UserRepositoryService } from './user-repository.service';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let router: Router;
    let userRepository: jasmine.SpyObj<UserRepositoryService>;

    beforeEach(() => {
        const repositorySpy = jasmine.createSpyObj('UserRepositoryService', ['isAuthenticated']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                AuthGuard,
                { provide: UserRepositoryService, useValue: repositorySpy }
            ]
        });

        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
        userRepository = TestBed.inject(UserRepositoryService) as jasmine.SpyObj<UserRepositoryService>;
    });

    it('should return true when the user is authenticated', () => {
        userRepository.isAuthenticated.and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTrue();
    });

    it('should redirect to /signin with auth_required when not authenticated', () => {
        userRepository.isAuthenticated.and.returnValue(false);

        const result = guard.canActivate() as UrlTree;

        expect(result instanceof UrlTree).toBeTrue();
        expect(result.toString()).toContain('/signin');
        expect(result.queryParams['reason']).toBe('auth_required');
    });
});
