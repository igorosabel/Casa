import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message.model';
import { Tag } from 'src/app/model/tag.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	message: Message = new Message();
	tags: Tag[] = [];
	addSending: boolean = false;
	types = [
		{ id: 0, name: 'Mensaje' },
		{ id: 1, name: 'Tarea' }
	];

	constructor(
		private as: ApiService,
		private cms: ClassMapperService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.as.getTags().subscribe(result => {
			this.tags = this.cms.getTags(result.list);
		});
	}

	doAdd(ev: MouseEvent): void {
		ev.preventDefault();

		if (this.message.body === '') {
			alert('¡No puedes dejar el mensaje en blanco!');
			return;
		}

		this.addSending = true;
		this.as.saveMessage(this.message.toInterface()).subscribe(result => {
			if (result.status === 'ok') {
				if (this.message.type === 0) {
					alert('¡Nuevo mensaje guardado!');
				}
				if (this.message.type === 1) {
					alert('¡Nueva tarea guardada!');
				}
				this.router.navigate(['/home']);
			}
			else {
				this.addSending = false;
				alert('¡Ocurrió un error! Por favor, vuelve a intentarlo en unos minutos.');
			}
		});
	}
}
