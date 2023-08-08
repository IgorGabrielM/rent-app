import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContactService } from 'src/@core/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: ContactModel[] = []

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.loadContact()
  }

  loadContact() {
    this.contactService.list().subscribe((contacts) => {
      this.contacts = contacts as ContactModel[];
    });
  }

}
