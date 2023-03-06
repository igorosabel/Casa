import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { MessageResult, StatusResult } from 'src/app/interfaces/interfaces';
import { Message } from 'src/app/model/message.model';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
})
export default class DetailComponent implements OnInit {
  message: Message = new Message();

  constructor(
    private activatedRoute: ActivatedRoute,
    private as: ApiService,
    private cms: ClassMapperService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      const id: number = params['id'];
      this.as.getMessage(id).subscribe((result: MessageResult): void => {
        if (result.status === 'ok') {
          this.message = this.cms.getMessage(result.message);
        } else {
          alert('¡Ocurrió un error al obtener el mensaje!');
        }
      });
    });
  }

  changeDone(): void {
    this.as
      .updateTask(this.message.id)
      .subscribe((result: StatusResult): void => {
        if (result.status === 'error') {
          alert('¡Ocurrió un error al actualizar el estado de la tarea!');
        }
      });
  }
}
