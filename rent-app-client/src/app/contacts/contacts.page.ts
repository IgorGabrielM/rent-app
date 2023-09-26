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
  results: ContactModel[] = []

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.loadContact()
  }

  loadContact() {
    this.contactService.list().subscribe((contacts) => {
      this.contacts = contacts as ContactModel[];
      this.results = this.contacts
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.contacts.filter((c) => c.name.toLowerCase().indexOf(query) > -1);
  }

}
