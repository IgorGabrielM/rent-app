import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAuthPage } from './main-auth.page';
import { SignInPage } from './sign-in/sign-in.page';
import { SignUpPage } from './sign-up/sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: MainAuthPage
  },
  {
    path: 'sign-in',
    component: SignInPage
  },
  {
    path: 'sign-up',
    component: SignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainAuthPageRoutingModule { }
