import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message.model';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	name: string = '';
	opened: boolean = false;

	messages: Message[] = [];

	constructor(
		private us: UserService,
		private as: ApiService,
		private cms: ClassMapperService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.name = this.us.user.name;
		this.as.getMessages().subscribe(result => {
			if (result.status === 'ok') {
				this.messages = this.cms.getMessages(result.list);
				console.log(this.messages);
			}
			else {
				alert('¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.');
			}
		});
	}

	toggleSidenav(): void {
		this.opened = !this.opened;
	}

	logout(ev: MouseEvent): void {
		ev.preventDefault();
		this.us.logout();
		this.router.navigate(['/']);
	}

	goToMessage(message: Message): void {
		this.router.navigate(['/message', message.id]);
	}
}
