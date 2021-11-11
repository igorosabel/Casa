import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	message: Message = new Message();
	addSending: boolean = false;
	types = [
		{ id: 0, name: 'Mensaje' },
		{ id: 1, name: 'Tarea' }
	];

	constructor(private as: ApiService) {}

	ngOnInit(): void {}

	doAdd(ev: MouseEvent): void {
		ev.preventDefault();

		if (this.message.body === '') {
			alert('¡No puedes dejar el mensaje en blanco!');
			return;
		}

		this.as.saveMessage(this.message.toInterface()).subscribe(result => {

		});
	}
}
