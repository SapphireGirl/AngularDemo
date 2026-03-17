import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser } from '../../services/models/user.model';

@Component({
  selector: 'account-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  @Input() user: IUser | null = null;
  @Output() signedOut = new EventEmitter<void>();

  signOut() {
    this.signedOut.emit();
  }
}
