import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'help-desk',
        loadChildren: () => import('../help-desk/help-desk.module').then(m => m.HelpDeskPageModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsPageModule),
      },
      {
        path: 'contacts/create-contact',
        loadChildren: () => import('../contacts/create-contact/create-contact.module').then(m => m.CreateContactPageModule)
      },
      {
        path: 'contacts/edit-contact/:id',
        loadChildren: () => import('../contacts/create-contact/create-contact.module').then(m => m.CreateContactPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'contracts',
        loadChildren: () => import('../contracts/contracts.module').then(m => m.ContractsPageModule)
      },
      {
        path: 'contracts/create-contract',
        loadChildren: () => import('../contracts/create-contract/create-contract.module').then(m => m.CreateContractPageModule)
      },
      {
        path: 'contracts/edit-contract/:id',
        loadChildren: () => import('../contracts/create-contract/create-contract.module').then(m => m.CreateContractPageModule)
      },
      {
        path: 'patrimony',
        loadChildren: () => import('../patrimony/patrimony.module').then(m => m.PatrimonyPageModule)
      },
      {
        path: 'patrimony/create-tool',
        loadChildren: () => import('../patrimony/create-tool/create-tool.module').then(m => m.CreateToolPageModule)
      },
      {
        path: 'patrimony/edit-tool',
        loadChildren: () => import('../patrimony/create-tool/create-tool.module').then(m => m.CreateToolPageModule)
      },
      {
        path: 'patrimony/edit-categories-and-tools',
        //path: 'patrimony/edit-categories-and-tools/:category-id',
        loadChildren: () => import('../patrimony/edit-categories-and-tools/edit-categories-and-tools.module').then(m => m.EditCategoriesAndToolsPageModule)
      },
      {
        path: 'patrimony/create-tool-category',
        loadChildren: () => import('../patrimony/create-tool-category/create-tool-category.module').then(m => m.CreateToolCategoryPageModule)
      },
      {
        path: 'patrimony/edit-tool-category',
        loadChildren: () => import('../patrimony/create-tool-category/create-tool-category.module').then(m => m.CreateToolCategoryPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
