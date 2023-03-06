import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData, LoginResult } from 'src/app/interfaces/interfaces';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/services/utils.class';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {
    email: '',
    pass: '',
  };
  loginSending: boolean = false;

  constructor(
    private as: ApiService,
    private us: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  doLogin(ev: MouseEvent): void {
    ev.preventDefault();
    if (this.loginData.email === '') {
      alert('¡No puedes dejar el email en blanco!');
      return;
    }
    if (this.loginData.pass === '') {
      alert('¡No puedes dejar la contraseña en blanco!');
      return;
    }

    this.loginSending = true;

    this.as.login(this.loginData).subscribe((result: LoginResult): void => {
      this.loginSending = false;
      if (result.status === 'ok') {
        this.us.logged = true;
        this.us.user.id = result.id;
        this.us.user.name = Utils.urldecode(result.name);
        this.us.user.email = this.loginData.email;
        this.us.user.token = Utils.urldecode(result.token);
        this.us.saveLogin();

        this.router.navigate(['/home']);
      } else {
        alert('¡Nombre de usuario o contraseña incorrectos!');
      }
    });
  }
}
