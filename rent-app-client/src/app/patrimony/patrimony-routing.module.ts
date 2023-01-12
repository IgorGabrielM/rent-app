import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatrimonyPage } from './patrimony.page';

const routes: Routes = [
  {
    path: '',
    component: PatrimonyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrimonyPageRoutingModule {}
