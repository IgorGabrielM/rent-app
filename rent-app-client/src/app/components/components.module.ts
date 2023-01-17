import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmniButtonComponent } from './omni-button/omni-button.component';
import { OmniInputComponent } from './omni-input/omni-input.component';
import { IonicModule } from '@ionic/angular';
import { OmniCardComponent } from './omni-card/omni-card.component';



@NgModule({
  declarations: [
    OmniButtonComponent,
    OmniInputComponent,
    OmniCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    OmniButtonComponent,
    OmniInputComponent,
    OmniCardComponent,
  ]
})
export class ComponentsModule { }
