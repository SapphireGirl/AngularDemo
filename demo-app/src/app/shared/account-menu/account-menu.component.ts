import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../services/models/user.model';

@Component({
  selector: 'account-menu',
  standalone: false,
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
