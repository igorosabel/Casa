import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/services/utils.class';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: []
})
export class RegisterComponent implements OnInit {
	registerData: RegisterData = {
		email: '',
		name: '',
		pass: '',
		conf_pass: ''
	};
	registerSending: boolean = false;

	constructor(
		private as: ApiService,
		private us: UserService,
		private router: Router
	) {}

	ngOnInit(): void {}

	doRegister(ev: MouseEvent): void  {
		ev.preventDefault();
		if (this.registerData.email === '') {
			alert('¡No puedes dejar el email en blanco!');
			return;
		}
		if (!Utils.validateEmail(this.registerData.email)) {
			alert('El email introducido no está bien formado.');
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
				this.us.logged     = true;
				this.us.user.id    = result.id;
				this.us.user.name  = Utils.urldecode(result.name);
				this.us.user.email = this.registerData.email;
				this.us.user.token = Utils.urldecode(result.token);
				this.us.saveLogin();

				this.router.navigate(['/home']);
			}
			else {
				if (result.status === 'in-use') {
					alert('La dirección de email introducida ya está registrada. ¿Has olvidado tu contraseña?');
				}
				else {
					alert('Ocurrión un error al registrar tu cuenta. Vuelve a intentarlo en unos minutos por favor.');
				}
			}
		});
	}
}
