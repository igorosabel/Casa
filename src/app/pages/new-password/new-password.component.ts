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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Params } from '@angular/router';
import { StatusResult } from 'src/app/interfaces/interfaces';
import { NewPassData } from 'src/app/interfaces/user.interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  imports: [
    NgClass,
    FormsModule,
    MatToolbar,
    MatIconButton,
    MatButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
  ],
})
export default class NewPasswordComponent implements OnInit {
  data: NewPassData = {
    pass: '',
    conf: '',
    token: '',
  };
  checkingLink: number = 0;
  newPasswordSending: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private as: ApiService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      const token: string = params['token'];

      this.as
        .checkPasswordToken(token)
        .subscribe((result: StatusResult): void => {
          if (result.status === 'ok') {
            this.checkingLink = 2;
            this.data.token = token;
          } else {
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
    this.as.newPassword(this.data).subscribe((result: StatusResult): void => {
      if (result.status === 'ok') {
        this.checkingLink = 3;
      } else {
        this.newPasswordSending = false;
        alert(
          '¡Ocurrió un error! Por favor, vuelve a intentarlo pasados unos minutos.'
        );
      }
    });
  }
}
