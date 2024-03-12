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
import { RouterLink } from '@angular/router';
import { StatusResult } from 'src/app/interfaces/interfaces';
import {
  ChangePassInterface,
  UserResult,
} from 'src/app/interfaces/user.interfaces';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { Utils } from 'src/app/services/utils.class';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    NgClass,
    FormsModule,
    RouterLink,
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
export default class ProfileComponent implements OnInit {
  user: User = new User();
  profileSending: boolean = false;
  passSending: boolean = false;

  pass: ChangePassInterface = {
    current: '',
    new_pass: '',
    conf_pass: '',
  };

  constructor(private as: ApiService, private cms: ClassMapperService) {}

  ngOnInit(): void {
    this.as.getUser().subscribe((result: UserResult): void => {
      if (result.status === 'ok') {
        this.user = this.cms.getUser(result.user);
      } else {
        alert(
          '¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.'
        );
      }
    });
  }

  doProfile(ev: MouseEvent): void {
    ev.preventDefault();

    if (this.user.email === '') {
      alert('¡No puedes dejar el email en blanco!');
      return;
    }

    if (!Utils.validateEmail(this.user.email)) {
      alert('El email introducido no está bien formado.');
      return;
    }

    if (this.user.name === '') {
      alert('¡No puedes dejar el nombre en blanco!');
      return;
    }

    this.profileSending = true;
    this.as
      .updateUser(this.user.toInterface())
      .subscribe((result: StatusResult): void => {
        this.profileSending = false;
        if (result.status == 'ok') {
          alert('¡Datos actualizados!');
        } else {
          alert(
            '¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.'
          );
        }
      });
  }

  doPass(ev: MouseEvent): void {
    ev.preventDefault();

    if (this.pass.current === '') {
      alert('¡No puedes dejar la contraseña actual en blanco!');
      return;
    }

    if (this.pass.new_pass === '') {
      alert('¡No puedes dejar la nueva contraseña en blanco!');
      return;
    }

    if (this.pass.conf_pass === '') {
      alert('¡No puedes dejar la confirmación de la contraseña en blanco!');
      return;
    }

    if (this.pass.new_pass !== this.pass.conf_pass) {
      alert('¡Las contraseñas introducidas no coinciden!');
      return;
    }

    this.passSending = true;
    this.as.updatePass(this.pass).subscribe((result: StatusResult): void => {
      this.passSending = false;
      switch (result.status) {
        case 'ok':
          {
            alert('¡Contraseña actualizada!');
            this.pass.current = '';
            this.pass.new_pass = '';
            this.pass.conf_pass = '';
          }
          break;
        case 'error-pass':
          {
            alert('¡La contraseña actual no es correcta!');
          }
          break;
        default: {
          alert(
            '¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.'
          );
        }
      }
    });
  }
}
