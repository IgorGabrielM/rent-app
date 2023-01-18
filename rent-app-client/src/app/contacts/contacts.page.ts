import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  data = [
    {
      title: 'Igor Gabriel',
      description: {
        telephone: '(19)99999-9999',
        email: 'example@email.com',
      }
    },
    {
      title: 'Igor Gabriel',
      description: {
        telephone: '(19)99999-9999',
        email: 'example@email.com',
      }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
