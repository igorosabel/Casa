import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NewPassData } from 'src/app/interfaces/interfaces';

@Component({
	selector: 'app-new-password',
	templateUrl: './new-password.component.html',
	styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
	data: NewPassData = {
		pass: '',
		conf: '',
		token: ''
	};
	checkingLink: number = 0;
	newPasswordSending: boolean = false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private as: ApiService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			const token = params['token'];

			this.as.checkPasswordToken(token).subscribe(result => {
				if (result.status==='ok') {
					this.checkingLink = 2;
					this.data.token = token;
				}
				else {
					this.checkingLink = 1;
				}
			});
		});
	}
	
	doNewPassword(ev: MouseEvent): void {
		ev.preventDefault();
		
		if (this.data.pass === '') {
			alert('¡No puedes dejar la contraseña en blanco!');
			return;
		}
		if (this.data.conf === '') {
			alert('¡No puedes dejar la confirmación de la contraseña en blanco!');
			return;
		}
		if (this.data.pass !== this.data.conf) {
			alert('¡Las contraseñas introducidas no coinciden!');
			return;
		}
		
		this.newPasswordSending = true;
		this.as.newPassword(this.data).subscribe(result => {
			if (result.status === 'ok') {
				this.checkingLink = 3;
			}
			else {
				this.newPasswordSending = false;
				alert('¡Ocurrió un error! Por favor, vuelve a intentarlo pasados unos minutos.');
			}
		});
	}
}