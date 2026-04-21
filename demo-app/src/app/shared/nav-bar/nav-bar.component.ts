import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserRepositoryService } from '../../services/user-repository.service';
import { AccountMenuComponent } from '../account-menu/account-menu.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, AccountMenuComponent]
})
export class NavBarComponent {
  constructor(private userRepository: UserRepositoryService) { }

  get currentUser() {
    return this.userRepository.currentUser;
  }

  handleSignOut() {
    this.userRepository.currentUser = null;
  }
}
