import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailComponent } from './pages/detail/detail.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
	{ path: '',                    component: LoginComponent },
	{ path: 'register',            component: RegisterComponent },
	{ path: 'lost-password',       component: LostPasswordComponent },
	{ path: 'new-password/:token', component: NewPasswordComponent },
	{ path: 'home',                component: HomeComponent,    canActivate: [AuthGuard] },
  { path: 'message/:id',         component: DetailComponent,  canActivate: [AuthGuard] },
	{ path: 'profile',             component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: 'add',                 component: AddComponent,     canActivate: [AuthGuard] },
	{ path: 'edit',                component: EditComponent,    canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
