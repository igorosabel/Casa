/*
 * Páginas
 */
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailComponent } from './pages/detail/detail.component';

export const PAGES: any[] = [
	LoginComponent,
	RegisterComponent,
	HomeComponent,
	AddComponent,
	EditComponent,
	LostPasswordComponent,
	NewPasswordComponent,
	ProfileComponent,
	DetailComponent
];

/*
 * Componentes parciales
 */
export const COMPONENTS: any[] = [];

 /*
 * Pipes
 */
export const PIPES: any[] = [];

/*
 * Servicios
 */
import { ApiService }         from './services/api.service';
import { DataShareService }   from './services/data-share.service';
import { UserService }        from './services/user.service';
import { ClassMapperService } from './services/class-mapper.service';
import { AuthService }        from './services/auth.service';

export const SERVICES: any[] = [
	ApiService,
	DataShareService,
	UserService,
	ClassMapperService,
	AuthService
];

/*
 * Componentes Angular Material
 */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

export const  MATERIAL: any[] = [
	MatCardModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatToolbarModule,
	MatIconModule,
	MatSidenavModule,
	MatListModule,
	MatRadioModule,
	MatCheckboxModule
];
