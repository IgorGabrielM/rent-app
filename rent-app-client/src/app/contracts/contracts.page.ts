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
  results: ContractModel[] = []

  constructor(
    private contractService: ContractService,
  ) { }

  ngOnInit() {
    this.loadContracts()
  }

  loadContracts() {
    this.contractService.list().subscribe((contracts: ContractModel[]) => {
      this.contracts = contracts.sort(this.sortContracts)
      this.results = this.contracts
    })
  }

  sortContracts(a, b) {
    if (a.endDateLocate && !b.endDateLocate) {
      return -1;
    } else if (!a.endDateLocate && b.endDateLocate) {
      return 1;
    } else {
      return 0;
    }
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    const filteredContracts = this.contracts.filter((c) => String(c.identifier).toLowerCase().indexOf(query) > -1 && c.identifier);
    this.results = filteredContracts.sort(this.sortContracts)
  }

}
