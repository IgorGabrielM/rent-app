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

  filteredContracts: ContractModel[] = [];
  searchTerm: string = '';
  selectedDate: string = '';

  constructor(
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.filteredContracts = this.contracts
    this.loadContacts()
  }

  ionViewWillEnter() {
    this.filteredContracts = this.contracts
    this.loadContacts()
  }

  filterData() {
    this.filteredContracts = this.contracts.filter(contract => {
      const dateWithoutTime = this.selectedDate.split("T")[0];
      const dateMatch = !this.selectedDate || String(contract.endDateLocate) === dateWithoutTime;
      return dateMatch;
    });
  }

  loadContacts() {
    this.contractService.list().subscribe((contracts: ContractModel[]) => {
      this.contracts = contracts
      this.filteredContracts = contracts
    })
  }

}
