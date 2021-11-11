import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';

import {
	LoginData,
	LoginResult,
	RegisterData,
	StatusResult,
	NewPassData
} from '../interfaces/interfaces';

@Injectable()
export class ApiService {
	apiUrl = environment.apiUrl;

	constructor(private http : HttpClient){}

	login(data: LoginData): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'api/login', data);
	}

	register(data: RegisterData): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'api/register', data);
	}

	recover(email: string): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'api/recover', {email});
	}
	
	checkPasswordToken(token: string): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'api/check-password-token', {token});
	}
	
	newPassword(data: NewPassData): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'api/new-password', data);
	}
}
