import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, NavBarComponent]
})
export class AppComponent {
  title = 'demo-app';
}
