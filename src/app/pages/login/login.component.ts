import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginData: LoginData = {
		email: '',
		pass: ''
	};
	loginSending: boolean = false;

	constructor(private as: ApiService) {}

	ngOnInit(): void {}

	doLogin(ev: MouseEvent): void  {
		ev.preventDefault();
		if (this.loginData.email === '') {
			alert('¡No puedes dejar el email en blanco!');
			return;
		}
		if (this.loginData.pass === '') {
			alert('¡No puedes dejar la contraseña en blanco!');
			return;
		}

		this.loginSending = true;

		this.as.login(this.loginData).subscribe(result => {
			this.loginSending = false;
			if (result.status === 'ok') {

			}
			else {
				alert('¡Nombre de usuario o contraseña incorrectos!');
			}
		});
	}
}
