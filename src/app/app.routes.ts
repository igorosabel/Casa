import { Routes } from '@angular/router';
import AuthGuard from '@app/guard/auth.guard.fn';
import LoginComponent from '@pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/register/register.component'),
  },
  {
    path: 'lost-password',
    loadComponent: () => import('@pages/lost-password/lost-password.component'),
  },
  {
    path: 'new-password/:token',
    loadComponent: () => import('@pages/new-password/new-password.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'message/:id',
    loadComponent: () => import('@pages/detail/detail.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('@pages/profile/profile.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadComponent: () => import('@pages/add/add.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadComponent: () => import('@pages/edit/edit.component'),
    canActivate: [AuthGuard],
  },
];

export default routes;
