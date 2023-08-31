import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
import { ModalContractPdfComponent } from '../modal-contract-pdf/modal-contract-pdf.component';
import { AssetModel } from 'src/@core/models/asset.model';
import { ContractService } from 'src/@core/services/contract.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})
export class ContractCardComponent implements OnInit {
  @Input() contract: ContractModel
  @Input() routerLinkContract: string

  constructor(
    private contractService: ContractService,

    private modalController: ModalController,
    private toastService: ToastService,
    private alertController: AlertController,
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

  async deleteContractAlert(contractId: string) {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: 'Deseja deletar o contrato? Ele não podera ser restaurado posteriormente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-confirm',
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm', handler: () => {
            this.deleteContract(contractId)
          }
        }
      ]
    });
    await alert.present();
  }

  deleteContract(contractId: string) {
    this.contractService.delete(contractId).then(() => {
      this.toastService.show('Sucesso', 'Contrato deletado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      })
    })
  }

}
