import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAuthPageRoutingModule } from './main-auth-routing.module';

import { MainAuthPage } from './main-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainAuthPageRoutingModule
  ],
  declarations: [MainAuthPage]
})
export class MainAuthPageModule {}
