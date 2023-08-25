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
