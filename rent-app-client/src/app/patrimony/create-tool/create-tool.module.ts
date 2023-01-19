import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateToolPageRoutingModule } from './create-tool-routing.module';

import { CreateToolPage } from './create-tool.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateToolPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateToolPage]
})
export class CreateToolPageModule { }
