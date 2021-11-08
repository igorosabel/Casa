import { Component, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerData: RegisterData = {
		email: '',
		name: '',
		pass: '',
		conf_pass: ''
	};
	registerSending: boolean = false;

	constructor(private as: ApiService) {}

	ngOnInit(): void {}

	doRegister(ev: MouseEvent): void  {
		ev.preventDefault();
		if (this.registerData.email === '') {
			alert('¡No puedes dejar el email en blanco!');
			return;
		}
		if (this.registerData.name === '') {
			alert('¡No puedes dejar el nombre en blanco!');
			return;
		}
		if (this.registerData.pass === '') {
			alert('¡No puedes dejar la contraseña en blanco!');
			return;
		}
		if (this.registerData.conf_pass === '') {
			alert('¡No puedes dejar la confirmación de la contraseña en blanco!');
			return;
		}
		if (this.registerData.pass !== this.registerData.conf_pass) {
			alert('¡Las contraseñas introducidas no coinciden!');
			return;
		}

		this.registerSending = true;

		this.as.register(this.registerData).subscribe(result => {
			this.registerSending = false;
			if (result.status === 'ok') {

			}
			else {
				alert('¡Nombre de usuario o contraseña incorrectos!');
			}
		});
	}
}
