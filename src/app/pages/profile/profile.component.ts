import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user: User = new User();
	profileSending: boolean = false;

	constructor() {}
	ngOnInit(): void {}

	doProfile(ev: MouseEvent):  void {
		console.log(this.user);
	}
}
