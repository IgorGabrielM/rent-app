import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractModel } from 'src/@core/models/contract.model';
import { ContractService } from 'src/@core/services/contract.service';
import { LoginService } from 'src/@core/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [ContractService]
})
export class HomePage implements OnInit {
  contracts: ContractModel[] = []

  filteredContracts: ContractModel[] = [];
  searchTerm: string = '';
  selectedDate: string = '';

  constructor(
    private contractService: ContractService,
    private loginService: LoginService,

    private router: Router
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
    if (!this.selectedDate) {
      var dat = new Date();
      var ano = dat.getFullYear();
      var mes = (dat.getMonth() + 1).toString().padStart(2, '0');
      var dia = dat.getDate().toString().padStart(2, '0');
      this.selectedDate = ano + '-' + mes + '-' + dia

      this.filteredContracts = this.contracts.filter(contract => {
        const dateWithoutTime = this.selectedDate.split("T")[0];
        const dateMatch = !this.selectedDate || String(contract.endDateLocate) === dateWithoutTime;
        return dateMatch;
      });

    } else {
      this.filteredContracts = this.contracts.filter(contract => {
        const dateWithoutTime = this.selectedDate.split("T")[0];
        const dateMatch = !this.selectedDate || String(contract.endDateLocate) === dateWithoutTime;
        return dateMatch;
      });
    }

  }

  loadContacts() {
    this.contractService.list().subscribe((contracts: ContractModel[]) => {
      this.contracts = contracts
      this.filterData()
    })
  }

  async logout() {
    localStorage.removeItem('uid')
    await this.loginService.logout()
    this.router.navigateByUrl('/', { replaceUrl: true })
  }

}
