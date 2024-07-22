import { inject, Injectable } from '@angular/core';
import { UserInterface } from '@interfaces/user.interfaces';
import User from '@model/user.model';
import ClassMapperService from '@services/class-mapper.service';
import StoreService from './store.service';

@Injectable()
export default class UserService {
  private cms: ClassMapperService = inject(ClassMapperService);
  private store: StoreService<User> = inject(StoreService);

  logged: boolean = false;
  id: number = -1;

  get user(): User {
    const user: User | undefined = this.store.getItem(
      (i: User): boolean => i.id === this.id
    );
    if (user !== undefined) {
      return user;
    }
    return new User();
  }

  loadLogin(): void {
    const loginStr: string | null = localStorage.getItem('login');
    if (loginStr === null) {
      this.logout();
    } else {
      const loginObj: UserInterface | null = JSON.parse(loginStr);
      if (loginObj === null) {
        this.logout();
      } else {
        this.logged = true;
        const user: User = this.cms.getUser(loginObj);
        this.id = user.id;
        this.store.addOrUpdateItem(user);
      }
    }
  }

  saveLogin(): void {
    const user: User | undefined = this.store.getItem(
      (i: User): boolean => i.id === this.id
    );
    if (user !== undefined) {
      const loginObj: UserInterface = user.toInterface();
      localStorage.setItem('login', JSON.stringify(loginObj));
    }
  }

  logout(): void {
    this.logged = false;
    this.id = -1;
    this.store.clearItems();
    localStorage.removeItem('login');
  }
}
