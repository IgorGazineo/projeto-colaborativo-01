import { Component } from '@angular/core';
import { AuthStateService } from '../../services/authState/auth-state.service';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [],
  templateUrl: './button-logout.component.html',
  styleUrl: './button-logout.component.scss'
})
export class ButtonLogoutComponent {

  constructor( private authStateService: AuthStateService){}

  logout(): void {
    this.authStateService.logout();
  }

}
