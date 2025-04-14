import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { ButtonLogoutComponent } from '../../components/button-logout/button-logout.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IMatchData } from '../../interfaces/matchData';
import { AuthStateService } from '../../services/authState/auth-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicFormComponent, ButtonLogoutComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
 

}
