import { Component, Input } from '@angular/core';
import { ContactModel } from 'src/@core/models/contact.model';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() contact: ContactModel

  constructor() { }

  ngOnInit() {
    console.log(this.contact)
  }

}
