import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';

import { authGuard } from './guards/auth/auth.guard';
import { authRedirectGuard } from './guards/authRedirect/auth-redirect.guard';
import { MatchComponent } from './Pages/match/match.component';
import { HistoryComponent } from './Pages/history/history.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent,  canActivate: [authRedirectGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'match', component: MatchComponent, canActivate: [authGuard]  },
    { path: 'history', component: HistoryComponent, canActivate: [authGuard]  },
    { path: 'register', component: RegisterComponent, },
    
];
