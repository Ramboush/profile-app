import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {
    this.initializeUserLoggedToken();
  }

  public initializeUserLoggedToken(): void {
    this.isLoggedIn = !!localStorage.getItem('logged-token');
  }

  public isUserLogged(): boolean {
    return this.isLoggedIn;
  }

  public logIn(): void {
    localStorage.setItem('logged-token', 'true');
    this.isLoggedIn = true;
    this.router.navigate(['/profile']);
  }

  public logOut(): void {
    localStorage.removeItem('logged-token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
