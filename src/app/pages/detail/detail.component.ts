import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { StatusResult } from 'src/app/interfaces/interfaces';
import { MessageResult } from 'src/app/interfaces/message.interfaces';
import { Message } from 'src/app/model/message.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  imports: [
    NgStyle,
    FormsModule,
    RouterModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCheckbox,
  ],
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
