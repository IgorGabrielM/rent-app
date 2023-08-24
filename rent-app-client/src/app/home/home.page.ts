import { Component, OnInit } from '@angular/core';
import { ContractModel } from 'src/@core/models/contract.model';
import { ContractService } from 'src/@core/services/contract.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contracts: ContractModel[] = []

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
      title: 'Igor Gab',
      description: {
        value: 'R$ 300,00',
        products: ['1x - Betoneira', '20x - Andaime', '15x - Escora'],
        timeStart: '23-06-2022',
        timeEnd: '23-06-2022'
      }
    }
  ]

  constructor(
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.loadContacts()
  }

  ionViewWillEnter() {
    this.loadContacts()
  }

  loadContacts() {
    this.contractService.list().subscribe((contracts: ContractModel[]) => {
      this.contracts = contracts
    })
  }

}
