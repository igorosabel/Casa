import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/modules/pages/login/login.component';

import { isLoggedGuardFn } from './guard/auth.guard.fn';

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
    canActivate: ['CanActivateFn'],
  },
  {
    path: 'message/:id',
    loadComponent: () =>
      import('src/app/modules/pages/detail/detail.component'),
    canActivate: ['CanActivateFn'],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('src/app/modules/pages/profile/profile.component'),
    canActivate: ['CanActivateFn'],
  },
  {
    path: 'add',
    loadComponent: () => import('src/app/modules/pages/add/add.component'),
    canActivate: ['CanActivateFn'],
  },
  {
    path: 'edit',
    loadComponent: () => import('src/app/modules/pages/edit/edit.component'),
    canActivate: ['CanActivateFn'],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: 'CanActivateFn', useFactory: isLoggedGuardFn }],
})
export class AppRoutingModule {}
