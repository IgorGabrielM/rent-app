import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateToolCategoryPage } from './create-tool-category.page';

const routes: Routes = [
  {
    path: '',
    component: CreateToolCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateToolCategoryPageRoutingModule {}
