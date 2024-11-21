import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { StatusResult } from '@interfaces/interfaces';
import { MessageResult } from '@interfaces/message.interfaces';
import Message from '@model/message.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';

@Component({
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
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);

  message: Message = new Message();

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
    if (this.message.id) {
      this.as
        .updateTask(this.message.id)
        .subscribe((result: StatusResult): void => {
          if (result.status === 'error') {
            alert('¡Ocurrió un error al actualizar el estado de la tarea!');
          }
        });
    }
  }
}
