import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { StatusResult } from '@interfaces/interfaces';
import ApiService from '@services/api.service';
import Utils from '@services/utils.class';

@Component({
  standalone: true,
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  imports: [
    NgClass,
    FormsModule,
    RouterLink,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
  ],
})
export default class LostPasswordComponent {
  private as: ApiService = inject(ApiService);

  email: string = '';
  lostSending: boolean = false;

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
    this.as.recover(this.email).subscribe((result: StatusResult): void => {
      this.lostSending = false;
      if (result.status === 'ok') {
        alert(
          'Se ha enviado un email a la dirección indicada con instrucciones para crear una nueva contraseña.'
        );
      } else {
        alert(
          '¡Ocurrió un error! Por favor, vuelve a intentarlo pasados unos minutos.'
        );
      }
    });
  }
}
