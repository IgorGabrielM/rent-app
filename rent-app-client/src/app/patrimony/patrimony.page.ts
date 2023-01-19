import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patrimony',
  templateUrl: './patrimony.page.html',
  styleUrls: ['./patrimony.page.scss'],
})
export class PatrimonyPage implements OnInit {

  data = [
    {
      title: 'Escoras',
      description: {
        data1: 'R$10,00',
        data2: '01/10',
        data3: '(Disponiveis)'
      }
    },
    {
      title: 'Betoneiras',
      description: {
        data1: 'R$10,00',
        data2: '01/10',
        data3: '(Disponiveis)'
      }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
