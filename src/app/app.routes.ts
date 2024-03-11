import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard.fn';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    loadComponent: () => import('src/app/pages/register/register.component'),
  },
  {
    path: 'lost-password',
    loadComponent: () =>
      import('src/app/pages/lost-password/lost-password.component'),
  },
  {
    path: 'new-password/:token',
    loadComponent: () =>
      import('src/app/pages/new-password/new-password.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('src/app/pages/home/home.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'message/:id',
    loadComponent: () => import('src/app/pages/detail/detail.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('src/app/pages/profile/profile.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadComponent: () => import('src/app/pages/add/add.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadComponent: () => import('src/app/pages/edit/edit.component'),
    canActivate: [AuthGuard],
  },
];
