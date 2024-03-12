import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatRadioButton } from '@angular/material/radio';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { StatusResult } from 'src/app/interfaces/interfaces';
import {
  MessageTypeInterface,
  TagsResult,
} from 'src/app/interfaces/message.interfaces';
import { Message } from 'src/app/model/message.model';
import { Tag } from 'src/app/model/tag.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
  standalone: true,
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [
    NgClass,
    FormsModule,
    RouterModule,
    MatToolbar,
    MatIconButton,
    MatButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatRadioButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatCheckbox,
  ],
})
export default class AddComponent implements OnInit {
  message: Message = new Message();
  tags: Tag[] = [];
  addSending: boolean = false;
  types: MessageTypeInterface[] = [
    { id: 0, name: 'Mensaje' },
    { id: 1, name: 'Tarea' },
  ];

  constructor(
    private as: ApiService,
    private cms: ClassMapperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.as.getTags().subscribe((result: TagsResult): void => {
      this.tags = this.cms.getTags(result.list);
    });
  }

  addTag(ev: MouseEvent, t: Tag): void {
    ev.preventDefault();
    if (this.message.tag_list.indexOf(t.name) === -1) {
      const tags: string[] = this.message.tag_list
        .split(',')
        .map((x: string): string => x.trim())
        .filter((x: string): boolean => x !== '');
      tags.push(t.name);
      this.message.tag_list = tags.join(', ');
    }
  }

  doAdd(ev: MouseEvent): void {
    ev.preventDefault();

    if (this.message.body === '') {
      alert('¡No puedes dejar el mensaje en blanco!');
      return;
    }

    //this.addSending = true;

    const tags: string[] = this.message.tag_list
      .split(',')
      .map((x: string): string => x.trim())
      .filter((x: string): boolean => x !== '');

    this.as
      .saveMessage(this.message.toInterface())
      .subscribe((result: StatusResult): void => {
        if (result.status === 'ok') {
          if (this.message.type === 0) {
            alert('¡Nuevo mensaje guardado!');
          }
          if (this.message.type === 1) {
            alert('¡Nueva tarea guardada!');
          }
          this.router.navigate(['/home']);
        } else {
          this.addSending = false;
          alert(
            '¡Ocurrió un error! Por favor, vuelve a intentarlo en unos minutos.'
          );
        }
      });
  }
}
