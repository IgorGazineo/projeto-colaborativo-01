import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../../services/authState/auth-state.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router)

  if (!authStateService || !router) {
    console.error('AuthStateService or Router is not available.');
    return false;
  }

  if (authStateService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;




};
