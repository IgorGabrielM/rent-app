import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const readirectUnauthorizedToLogin = () => redirectUnauthorizedTo([''])
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs'])

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then(m => m.SignInPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(readirectUnauthorizedToLogin)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'help-desk',
    loadChildren: () => import('./help-desk/help-desk.module').then(m => m.HelpDeskPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsPageModule)
  },
  {
    path: 'patrimony',
    loadChildren: () => import('./patrimony/patrimony.module').then(m => m.PatrimonyPageModule)
  },
  {
    path: 'create-contract',
    loadChildren: () => import('./contracts/create-contract/create-contract.module').then(m => m.CreateContractPageModule)
  },
  {
    path: 'create-tool',
    loadChildren: () => import('./patrimony/create-tool/create-tool.module').then(m => m.CreateToolPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
