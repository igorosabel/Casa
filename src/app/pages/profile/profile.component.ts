import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { Utils } from 'src/app/services/utils.class';
import { ChangePassInterface } from 'src/app/interfaces/interfaces';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user: User = new User();
	profileSending: boolean = false;
	passSending: boolean = false;

	pass: ChangePassInterface = {
		current: '',
		new_pass: '',
		conf_pass: ''
	};

	constructor(
		private as: ApiService,
		private cms: ClassMapperService
	) {}

	ngOnInit(): void {
		this.as.getUser().subscribe(result => {
			if (result.status === 'ok') {
				this.user = this.cms.getUser(result.user);
			}
			else {
				alert('¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.');
			}
		});
	}

	doProfile(ev: MouseEvent):  void {
		ev.preventDefault();

		if (this.user.email === '') {
			alert('¡No puedes dejar el email en blanco!');
			return;
		}

		if (!Utils.validateEmail(this.user.email)) {
			alert('El email introducido no está bien formado.');
			return;
		}

		if (this.user.name === '') {
			alert('¡No puedes dejar el nombre en blanco!');
			return;
		}

		this.profileSending = true;
		this.as.updateUser(this.user.toInterface()).subscribe(result => {
			this.profileSending = false;
			if (result.status == 'ok') {
				alert('¡Datos actualizados!');
			}
			else {
				alert('¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.');
			}
		});
	}

	doPass(ev: MouseEvent): void {
		ev.preventDefault();

		if (this.pass.current === '') {
			alert('¡No puedes dejar la contraseña actual en blanco!');
			return;
		}

		if (this.pass.new_pass === '') {
			alert('¡No puedes dejar la nueva contraseña en blanco!');
			return;
		}

		if (this.pass.conf_pass === '') {
			alert('¡No puedes dejar la confirmación de la contraseña en blanco!');
			return;
		}

		if (this.pass.new_pass !== this.pass.conf_pass) {
			alert('¡Las contraseñas introducidas no coinciden!');
			return;
		}

		this.passSending = true;
		this.as.updatePass(this.pass).subscribe(result => {
			this.passSending = false;
			switch (result.status) {
				case 'ok': {
					alert('¡Contraseña actualizada!');
					this.pass.current = '';
					this.pass.new_pass = '';
					this.pass.conf_pass = '';
				}
				break;
				case 'error-pass': {
					alert('¡La contraseña actual no es correcta!');
				}
				break;
				default: {
					alert('¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.');
				}
			}
		});
	}
}
