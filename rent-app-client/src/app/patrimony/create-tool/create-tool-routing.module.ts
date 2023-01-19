import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateToolPage } from './create-tool.page';

const routes: Routes = [
  {
    path: '',
    component: CreateToolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateToolPageRoutingModule {}
