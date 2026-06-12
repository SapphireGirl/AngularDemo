import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { UserRepositoryService } from '../services/user-repository.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: false
})
export class SignInComponent {
    email = 'justinedeveloper@outlook.com';
    password = '';
    showPassword = false;
    isLoading = false;
    infoMessage = '';
    errorMessage = '';

    constructor(
        private userRepository: UserRepositoryService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        const reason = this.route.snapshot.queryParamMap.get('reason');
        if (reason === 'auth_required') {
            this.infoMessage = 'You must sign in to view catalog.';
        }
    }

    get currentUser() {
        return this.userRepository.currentUser;
    }

    get passwordInputType(): 'password' | 'text' {
        return this.showPassword ? 'text' : 'password';
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    signIn(): void {
        this.errorMessage = '';
        this.infoMessage = '';
        this.isLoading = true;

        this.userRepository.signIn({ email: this.email, password: this.password }).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/catalog']);
            },
            error: (error: HttpErrorResponse | Error) => {
                this.isLoading = false;
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.errorMessage = 'Invalid email or password.';
                    } else if (error.status === 0) {
                        this.errorMessage = 'Cannot connect to server. Please try again later.';
                    } else {
                        this.errorMessage = `Sign in failed (${error.status}). Please try again.`;
                    }
                } else {
                    this.errorMessage = error.message;
                }
            }
        });
    }

    signOut(): void {
        this.userRepository.signOut();
        this.infoMessage = '';
        this.errorMessage = '';
    }
}