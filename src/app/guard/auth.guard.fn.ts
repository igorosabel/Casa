import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthGuard {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
