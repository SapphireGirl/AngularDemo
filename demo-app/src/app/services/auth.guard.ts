import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { UserRepositoryService } from './user-repository.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private userRepository: UserRepositoryService,
        private router: Router
    ) { }

    canActivate(): boolean | UrlTree {
        if (this.userRepository.isAuthenticated()) {
            return true;
        }

        return this.router.createUrlTree(['/signin'], {
            queryParams: { reason: 'auth_required' }
        });
    }
}