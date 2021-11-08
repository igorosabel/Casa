import { Injectable } from '@angular/core';
import { DataShareService } from './data-share.service';
import { ClassMapperService } from './class-mapper.service';
import { User } from '../model/user.model';
import { UserInterface } from '../interfaces/interfaces';

@Injectable()
export class UserService {
	logged: boolean = false;
	user: User = new User();

	constructor(private dss: DataShareService, private cms: ClassMapperService) {
		this.dss.setSaveLocalStorage(true);
	}

	loadLogin() {
		const loginObj = this.dss.getGlobal('login');
		if (loginObj === null) {
			this.logout();
		}
		else {
			this.logged = true;
			this.user = this.cms.getUser(loginObj);
		}
	}

	saveLogin() {
		const loginObj: UserInterface = this.user.toInterface();
		this.dss.setGlobal('login', loginObj);
	}

	logout() {
		this.logged = false;
		this.user = new User();
		this.dss.removeGlobal('login');
	}
}