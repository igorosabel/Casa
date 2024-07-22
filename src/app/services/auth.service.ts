import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import UserService from '@services/user.service';

@Injectable()
export default class AuthService {
  private us: UserService = inject(UserService);

  public isAuthenticated(): boolean {
    this.us.loadLogin();
    if (!this.us.logged) {
      this.us.logout();
    }
    const helper = new JwtHelperService();
    return this.us.logged && !helper.isTokenExpired(this.us.user.token);
  }
}
