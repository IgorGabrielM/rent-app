import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAuthPageRoutingModule } from './main-auth-routing.module';

import { MainAuthPage } from './main-auth.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainAuthPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MainAuthPage]
})
export class MainAuthPageModule { }
