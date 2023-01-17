import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {

  data = [
    {
      title: 'Igor Gabriel',
      description: {
        value: 'R$ 300,00',
        products: ['1x - Betoneira', '20x - Andaime', '15x - Escora'],
        timeStart: '23-06-2022',
        timeEnd: '23-06-2022'
      }
    },
    {
      title: 'Matheus Dantas',
      description: {
        value: 'R$ 300,00',
        products: ['1x - Betoneira', '20x - Andaime', '15x - Escora'],
        timeStart: '23-06-2022',
        timeEnd: '23-06-2022'
      }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
