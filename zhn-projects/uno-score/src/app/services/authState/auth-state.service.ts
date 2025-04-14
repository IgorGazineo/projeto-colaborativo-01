import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthStateService {

  private readonly storageKey = 'auth_user'
  private authenticatedUser: any = null;

  constructor( private router: Router) {
    this.loadUserFromStorage();
   }

   private loadUserFromStorage(): void {
    const user = localStorage.getItem(this.storageKey);
    if (user) {
      this.authenticatedUser = JSON.parse(user);
    }
  }

  setUser(user: any): void {

    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.authenticatedUser = user;
    // console.log(this.authenticatedUser)
  }

  getUser(): any {
    if (!this.authenticatedUser) {
      this.loadUserFromStorage(); 
    }
    return this.authenticatedUser;
  }
  
  isAuthenticated(): boolean {
    if(!this.authenticatedUser) {
      this.loadUserFromStorage();
    }
    // console.log('Authenticated User:', this.authenticatedUser);
    return !!this.authenticatedUser;
    
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
    this.authenticatedUser = null;
  }
}
