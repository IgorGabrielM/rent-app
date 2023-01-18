import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmniButtonComponent } from './omni-button/omni-button.component';
import { OmniInputComponent } from './omni-input/omni-input.component';
import { IonicModule } from '@ionic/angular';
import { OmniSwiperDaysComponent } from './omni-swiper-days/omni-swiper-days.component';
import { SwiperModule } from 'swiper/angular';
import { OmniCardAcordionComponent } from './omni-card-acordion/omni-card-acordion.component';
import { OmniCardComponent } from './omni-card/omni-card.component';



@NgModule({
  declarations: [
    OmniButtonComponent,
    OmniInputComponent,
    OmniSwiperDaysComponent,
    OmniCardAcordionComponent,
    OmniCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ],
  exports: [
    OmniButtonComponent,
    OmniInputComponent,
    OmniCardAcordionComponent,
    OmniSwiperDaysComponent,
    OmniCardComponent
  ]
})
export class ComponentsModule { }
