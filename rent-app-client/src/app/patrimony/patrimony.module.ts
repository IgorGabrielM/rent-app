import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatrimonyPageRoutingModule } from './patrimony-routing.module';

import { PatrimonyPage } from './patrimony.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatrimonyPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PatrimonyPage]
})
export class PatrimonyPageModule { }
