import { Injectable }       from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService }      from './user.service';

@Injectable()
export class AuthService {
	constructor(private us: UserService) {}

	public isAuthenticated(): boolean {
		this.us.loadLogin();
		if (!this.us.logged) {
			this.us.logout();
		}
		const helper = new JwtHelperService();
		return this.us.logged && !helper.isTokenExpired(this.us.user.token);
	}
}
