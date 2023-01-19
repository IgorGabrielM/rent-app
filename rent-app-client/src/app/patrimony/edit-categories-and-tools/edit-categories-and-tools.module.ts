import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCategoriesAndToolsPageRoutingModule } from './edit-categories-and-tools-routing.module';

import { EditCategoriesAndToolsPage } from './edit-categories-and-tools.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCategoriesAndToolsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EditCategoriesAndToolsPage]
})
export class EditCategoriesAndToolsPageModule { }
