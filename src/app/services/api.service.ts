import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';

import {
	LoginData,
	LoginResult,
	RegisterData,
	StatusResult,
	NewPassData,
	MessageInterface,
	TagsResult,
	MessagesResult,
	MessageResult
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

	getTags(): Observable<TagsResult> {
		return this.http.post<TagsResult>(this.apiUrl + 'api/get-tags', {});
	}

	saveMessage(message: MessageInterface): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'api/save-message', message);
	}

	getMessages(): Observable<MessagesResult> {
		return this.http.post<MessagesResult>(this.apiUrl + 'api/get-messages', {});
	}

	getMessage(id: number): Observable<MessageResult> {
		return this.http.post<MessageResult>(this.apiUrl + 'api/get-message', {id});
	}

	updateTask(id: number): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'api/update-task', {id});
	}
}
