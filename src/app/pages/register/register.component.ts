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
import { Router, RouterLink } from '@angular/router';
import { LoginResult, RegisterData } from '@interfaces/interfaces';
import { urldecode, validateEmail } from '@osumi/tools';
import ApiService from '@services/api.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
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
export default class RegisterComponent {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private router: Router = inject(Router);

  registerData: RegisterData = {
    email: '',
    name: '',
    pass: '',
    conf_pass: '',
  };
  registerSending: boolean = false;

  doRegister(ev: MouseEvent): void {
    ev.preventDefault();
    if (this.registerData.email === '') {
      alert('¡No puedes dejar el email en blanco!');
      return;
    }
    if (!validateEmail(this.registerData.email)) {
      alert('El email introducido no está bien formado.');
      return;
    }
    if (this.registerData.name === '') {
      alert('¡No puedes dejar el nombre en blanco!');
      return;
    }
    if (this.registerData.pass === '') {
      alert('¡No puedes dejar la contraseña en blanco!');
      return;
    }
    if (this.registerData.conf_pass === '') {
      alert('¡No puedes dejar la confirmación de la contraseña en blanco!');
      return;
    }
    if (this.registerData.pass !== this.registerData.conf_pass) {
      alert('¡Las contraseñas introducidas no coinciden!');
      return;
    }

    this.registerSending = true;

    this.as
      .register(this.registerData)
      .subscribe((result: LoginResult): void => {
        this.registerSending = false;
        if (result.status === 'ok') {
          this.us.logged = true;
          this.us.user.id = result.id;
          this.us.user.name = urldecode(result.name);
          this.us.user.email = this.registerData.email;
          this.us.user.token = urldecode(result.token);
          this.us.saveLogin();

          this.router.navigate(['/home']);
        } else {
          if (result.status === 'in-use') {
            alert(
              'La dirección de email introducida ya está registrada. ¿Has olvidado tu contraseña?'
            );
          } else {
            alert(
              'Ocurrión un error al registrar tu cuenta. Vuelve a intentarlo en unos minutos por favor.'
            );
          }
        }
      });
  }
}
