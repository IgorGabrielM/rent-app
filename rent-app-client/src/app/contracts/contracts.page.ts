import { Component, OnInit } from '@angular/core';
import { ContractModel } from 'src/@core/models/contract.model';
import { ContractService } from 'src/@core/services/contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss'],
})
export class ContractsPage implements OnInit {

  contracts: ContractModel[] = []

  constructor(
    private contractService: ContractService,
  ) { }

  ngOnInit() {
    this.loadContracts()
  }

  loadContracts() {
    this.contractService.list().subscribe((contracts: ContractModel[]) => {
      this.contracts = contracts
    })
  }

}
