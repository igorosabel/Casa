import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	name: string = '';
	opened: boolean = false;

	constructor(
		private us: UserService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.name = this.us.user.name;
	}

	toggleSidenav(): void {
		this.opened = !this.opened;
	}

	logout(ev: MouseEvent): void {
		ev.preventDefault();
		this.us.logout();
		this.router.navigate(['/']);
	}
}