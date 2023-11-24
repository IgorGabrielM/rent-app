import { Component, Input, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { ContactModel } from 'src/@core/models/contact.model';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @ViewChild('itemSlide', { static: true }) itemSlide: IonItemSliding;

  @Input() contact: ContactModel

  constructor() { }

  ngOnInit() {
  }

}
