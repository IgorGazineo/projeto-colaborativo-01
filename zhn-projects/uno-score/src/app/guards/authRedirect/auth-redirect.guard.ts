import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../../services/authState/auth-state.service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);


  if (authStateService.isAuthenticated()) {
    router.navigate(['/home']); 
    return false; 
  }
  return true; 
};
