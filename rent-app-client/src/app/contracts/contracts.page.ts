import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss'],
})
export class ContractsPage implements OnInit {

  data = [
    {
      title: 'Igor Gabriel',
      description: {
        data1: 'Jd. Park Real',
        data2: 'Rua 10 - Nº 120',
      }
    },
    {
      title: 'Matheus Dantas',
      description: {
        data1: 'Jd. Park Real',
        data2: 'Rua 10 - Nº 120',
      }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
