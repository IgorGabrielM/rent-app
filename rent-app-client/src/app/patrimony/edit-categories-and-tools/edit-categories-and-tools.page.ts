import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-categories-and-tools',
  templateUrl: './edit-categories-and-tools.page.html',
  styleUrls: ['./edit-categories-and-tools.page.scss'],
})
export class EditCategoriesAndToolsPage implements OnInit {

  dataCategory = [
    {
      id: '1',
      title: 'Escoras',
      description: {
        data0: 'Valor unitário:',
        data1: 'R$10,00',
        data2: '01/02',
        data3: '(Disponíveis)'
      }
    },
  ]

  dataTools = [
    {
      id: '1',
      title: 'Escora Gerdau',
      description: {
        data1: '0001',
      }
    },
    {
      id: '2',
      title: 'Escora Menegoti',
      description: {
        data1: '0002',
      }
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
