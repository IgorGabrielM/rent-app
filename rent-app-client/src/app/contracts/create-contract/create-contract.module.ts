import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateContractPageRoutingModule } from './create-contract-routing.module';

import { CreateContractPage } from './create-contract.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateContractPageRoutingModule,
    MaskitoModule,
    ComponentsModule,
  ],
  declarations: [CreateContractPage]
})
export class CreateContractPageModule { }
