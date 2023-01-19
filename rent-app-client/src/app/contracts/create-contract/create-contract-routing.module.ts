import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateContractPage } from './create-contract.page';

const routes: Routes = [
  {
    path: '',
    component: CreateContractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateContractPageRoutingModule {}
