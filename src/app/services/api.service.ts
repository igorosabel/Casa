import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  LoginData,
  LoginResult,
  RegisterData,
  StatusResult,
} from '@interfaces/interfaces';
import {
  MessageInterface,
  MessageResult,
  MessagesResult,
  TagsResult,
} from '@interfaces/message.interfaces';
import {
  ChangePassInterface,
  NewPassData,
  UserInterface,
  UserResult,
} from '@interfaces/user.interfaces';
import { Observable } from 'rxjs';

@Injectable()
export default class ApiService {
  private http: HttpClient = inject(HttpClient);

  apiUrl: string = environment.apiUrl;

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'api/login', data);
  }

  register(data: RegisterData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'api/register', data);
  }

  recover(email: string): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'api/recover', { email });
  }

  checkPasswordToken(token: string): Observable<StatusResult> {
    return this.http.post<StatusResult>(
      this.apiUrl + 'api/check-password-token',
      { token }
    );
  }

  newPassword(data: NewPassData): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'api/new-password', data);
  }

  getTags(): Observable<TagsResult> {
    return this.http.post<TagsResult>(this.apiUrl + 'api/get-tags', {});
  }

  saveMessage(message: MessageInterface): Observable<StatusResult> {
    return this.http.post<StatusResult>(
      this.apiUrl + 'api/save-message',
      message
    );
  }

  getMessages(): Observable<MessagesResult> {
    return this.http.post<MessagesResult>(this.apiUrl + 'api/get-messages', {});
  }

  getMessage(id: number): Observable<MessageResult> {
    return this.http.post<MessageResult>(this.apiUrl + 'api/get-message', {
      id,
    });
  }

  updateTask(id: number): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'api/update-task', {
      id,
    });
  }

  getUser(): Observable<UserResult> {
    return this.http.post<UserResult>(this.apiUrl + 'api/get-user', {});
  }

  updateUser(user: UserInterface): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'api/update-user', user);
  }

  updatePass(pass: ChangePassInterface): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'api/update-pass', pass);
  }
}
