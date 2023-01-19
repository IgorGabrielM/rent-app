import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCategoriesAndToolsPage } from './edit-categories-and-tools.page';

const routes: Routes = [
  {
    path: '',
    component: EditCategoriesAndToolsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCategoriesAndToolsPageRoutingModule {}
