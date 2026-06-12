import { Component } from '@angular/core';

import { UserRepositoryService } from '../../services/user-repository.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: false
})
export class NavBarComponent {
  constructor(private userRepository: UserRepositoryService) { }

  get currentUser() {
    return this.userRepository.currentUser;
  }

  handleSignOut() {
    this.userRepository.signOut();
  }
}
