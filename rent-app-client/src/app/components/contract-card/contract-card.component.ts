import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
import { ModalContractPdfComponent } from '../modal-contract-pdf/modal-contract-pdf.component';

@Component({
  selector: 'contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})
export class ContractCardComponent implements OnInit {
  @Input() contract: ContractModel

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  getDescriptionFormated(): string {
    return `${this.contract.street} - ${this.contract.numberHouse}`
  }

  async openPdfModal() {
    const modal = await this.modalController.create({
      component: ModalContractPdfComponent,
      componentProps: {
        contract: this.contract
      }
    });
    return await modal.present();
  }

}
