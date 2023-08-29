import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
import { ModalContractPdfComponent } from '../modal-contract-pdf/modal-contract-pdf.component';
import { AssetModel } from 'src/@core/models/asset.model';

@Component({
  selector: 'contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})
export class ContractCardComponent implements OnInit {
  @Input() contract: ContractModel
  @Input() routerLinkContract: string

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  async openPdfModal() {
    const modal = await this.modalController.create({
      component: ModalContractPdfComponent,
      componentProps: {
        contract: this.contract
      }
    });
    return await modal.present();
  }

  getValueOfQuantity(asset: AssetModel) {
    return Number(asset.assetCategory.value) * asset.quantity
  }

  getTotalValue(): number {
    let totalValue: number = 0;

    this.contract.assets.forEach((asset) => {
      totalValue += Number(asset.assetCategory.value) * asset.quantity;
    });

    return totalValue;
  }


}
