import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Utils } from 'src/app/services/utils.class';

@Component({
	selector: 'app-lost-password',
	templateUrl: './lost-password.component.html',
	styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {
	email: string = '';
	lostSending: boolean = false;

	constructor(private as: ApiService) {}

	ngOnInit(): void {}

	doRecover(ev: MouseEvent): void {
		ev.preventDefault();

		if (this.email === '') {
			alert('¡No puedes dejar el email en blanco!');
			return;
		}
		if (!Utils.validateEmail(this.email)) {
			alert('El email introducido no está bien formado.');
			return;
		}

		this.lostSending = true;
		this.as.recover(this.email).subscribe(result => {
			this.lostSending = false;
			if (result.status === 'ok') {
				alert('Se ha enviado un email a la dirección indicada con instrucciones para crear una nueva contraseña.');
			}
			else {
				alert('¡Ocurrió un error! Por favor, vuelve a intentarlo pasados unos minutos.');
			}
		});
	}
}