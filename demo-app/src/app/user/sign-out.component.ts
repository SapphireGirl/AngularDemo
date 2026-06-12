import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRepositoryService } from '../services/user-repository.service';

@Component({
  selector: 'app-sign-out',
  template: '<p class="signout-message">Signing you out...</p>',
  standalone: false
})
export class SignOutComponent implements OnInit {
  constructor(
    private userRepository: UserRepositoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRepository.signOut();
    this.router.navigate(['/signin']);
  }
}