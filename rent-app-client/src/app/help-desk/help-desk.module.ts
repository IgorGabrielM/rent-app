import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpDeskPageRoutingModule } from './help-desk-routing.module';

import { HelpDeskPage } from './help-desk.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpDeskPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [HelpDeskPage]
})
export class HelpDeskPageModule { }
