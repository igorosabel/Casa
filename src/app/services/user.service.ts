import { inject, Injectable } from '@angular/core';
import { UserInterface } from '@interfaces/user.interfaces';
import User from '@model/user.model';
import ClassMapperService from '@services/class-mapper.service';
import DataShareService from '@services/data-share.service';

@Injectable()
export default class UserService {
  private dss: DataShareService = inject(DataShareService);
  private cms: ClassMapperService = inject(ClassMapperService);

  logged: boolean = false;
  user: User = new User();

  loadLogin(): void {
    const loginObj: UserInterface = this.dss.getGlobal('login');
    if (loginObj === null) {
      this.logout();
    } else {
      this.logged = true;
      this.user = this.cms.getUser(loginObj);
    }
  }

  saveLogin(): void {
    const loginObj: UserInterface = this.user.toInterface();
    this.dss.setGlobal('login', loginObj);
  }

  logout(): void {
    this.logged = false;
    this.user = new User();
    this.dss.removeGlobal('login');
  }
}
