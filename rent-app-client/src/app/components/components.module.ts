import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmniButtonComponent } from './omni-button/omni-button.component';
import { OmniInputComponent } from './omni-input/omni-input.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    OmniButtonComponent,
    OmniInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    OmniButtonComponent,
    OmniInputComponent,

  ]
})
export class ComponentsModule { }
