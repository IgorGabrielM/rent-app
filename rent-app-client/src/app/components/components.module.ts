import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmniButtonComponent } from './omni-button/omni-button.component';
import { OmniInputComponent } from './omni-input/omni-input.component';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { OmniCardAcordionComponent } from './omni-card-acordion/omni-card-acordion.component';
import { OmniCardComponent } from './omni-card/omni-card.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OmniTextAreaComponent } from './omni-text-area/omni-text-area.component';
import { OmniSignaturePadComponent } from './omni-signature-pad/omni-signature-pad.component';
import { AssetCategoryCardComponent } from './asset-category-card/asset-category-card.component';
import { AssetCardComponent } from './asset-card/asset-card.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContractCardComponent } from './contract-card/contract-card.component';
import { ModalManagementPaymentComponent } from './modal-management-payment/modal-management-payment.component';
import { DateCarouselComponent } from './date-carousel/date-carousel.component';
import { CalendarComponent } from './calendar/calendar.component';
@NgModule({
  declarations: [
    OmniButtonComponent,
    OmniInputComponent,
    OmniCardAcordionComponent,
    OmniCardComponent,
    OmniTextAreaComponent,
    OmniSignaturePadComponent,
    AssetCardComponent,
    AssetCategoryCardComponent,
    ContactCardComponent,
    ContractCardComponent,
    ModalManagementPaymentComponent,
    DateCarouselComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    RouterModule,
  ],
  exports: [
    OmniButtonComponent,
    OmniInputComponent,
    OmniCardAcordionComponent,
    OmniCardComponent,
    OmniTextAreaComponent,
    OmniSignaturePadComponent,
    AssetCardComponent,
    AssetCategoryCardComponent,
    ContactCardComponent,
    ContractCardComponent,
    CalendarComponent,
    DateCarouselComponent,
  ]
})
export class ComponentsModule { }
