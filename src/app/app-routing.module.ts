import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/modules/pages/login/login.component';

import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('src/app/modules/pages/register/register.component'),
  },
  {
    path: 'lost-password',
    loadComponent: () =>
      import('src/app/modules/pages/lost-password/lost-password.component'),
  },
  {
    path: 'new-password/:token',
    loadComponent: () =>
      import('src/app/modules/pages/new-password/new-password.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('src/app/modules/pages/home/home.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'message/:id',
    loadComponent: () =>
      import('src/app/modules/pages/detail/detail.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('src/app/modules/pages/profile/profile.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadComponent: () => import('src/app/modules/pages/add/add.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadComponent: () => import('src/app/modules/pages/edit/edit.component'),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
