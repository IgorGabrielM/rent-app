import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'main-auth',
    loadChildren: () => import('./auth/main-auth/main-auth.module').then(m => m.MainAuthPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/main-auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/main-auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'help-desk',
    loadChildren: () => import('./help-desk/help-desk.module').then( m => m.HelpDeskPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('./contracts/contracts.module').then( m => m.ContractsPageModule)
  },
  {
    path: 'patrimony',
    loadChildren: () => import('./patrimony/patrimony.module').then( m => m.PatrimonyPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
