import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Utils } from '../services/utils.class';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public us: UserService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: this.us.user.token ? Utils.urldecode(this.us.user.token) : ''
			}
		});
		return next.handle(request);
	}
}
