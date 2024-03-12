import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interfaces';
import { User } from 'src/app/model/user.model';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Injectable()
export class UserService {
  logged: boolean = false;
  user: User = new User();

  constructor(private dss: DataShareService, private cms: ClassMapperService) {
    this.dss.setSaveLocalStorage(true);
  }

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
