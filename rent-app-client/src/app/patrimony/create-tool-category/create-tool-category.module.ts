import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateToolCategoryPageRoutingModule } from './create-tool-category-routing.module';

import { CreateToolCategoryPage } from './create-tool-category.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateToolCategoryPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CreateToolCategoryPage]
})
export class CreateToolCategoryPageModule { }
