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
        data1: '(19)99999-9999',
        data2: 'example@email.com',
      }
    },
    {
      title: 'Igor Gabriel',
      description: {
        data1: '(19)99999-9999',
        data2: 'example@email.com',
      }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
