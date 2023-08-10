import { Component, Input, OnInit } from '@angular/core';
import { ContractModel } from 'src/@core/models/contract.model';

@Component({
  selector: 'contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})
export class ContractCardComponent implements OnInit {
  @Input() contract: ContractModel

  constructor(
  ) { }

  ngOnInit() { }

  getDescriptionFormated(): string {
    return `${this.contract.street} - ${this.contract.numberHouse}`
  }

}
