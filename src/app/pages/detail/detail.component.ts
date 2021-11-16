import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { Message } from 'src/app/model/message.model';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
	message: Message = new Message();

	constructor(
		private activatedRoute: ActivatedRoute,
		private as: ApiService,
		private cms: ClassMapperService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			const id: number = params['id'];
			this.as.getMessage(id).subscribe(result => {
				if (result.status === 'ok') {
					this.message = this.cms.getMessage(result.message);
				}
				else {
					alert('¡Ocurrió un error al obtener el mensaje!');
				}
			});
		});
	}

	changeDone(): void {
		this.as.updateTask(this.message.id).subscribe(result => {
			if (result.status === 'error') {
				alert('¡Ocurrió un error al actualizar el estado de la tarea!');
			}
		});
	}
}
