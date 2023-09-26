import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
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
  @ViewChild('itemSlide', { static: true }) itemSlide: IonItemSliding;

  @Input() contract: ContractModel
  @Input() routerLinkContract: string

  @Input() icons: string[]
  @Input() routerLinks: string[]

  isFunctionCalled: boolean = false

  constructor(
    private contractService: ContractService,

    private modalController: ModalController,
    private toastService: ToastService,
    private alertController: AlertController,
  ) { }

  ngOnInit() { }

  getValueOfQuantity(asset: AssetModel) {
    return Number(asset.assetCategory.value) * asset.quantity
  }

  getTotalValue(): number {
    let totalValue: number = 0;
    this.contract?.assets.forEach((asset) => {
      totalValue += Number(asset.assetCategory.value) * asset.quantity;
    });
    return totalValue;
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

  slideToDelete(event: any, contractId: string) {
    const distance = event.detail.ratio;
    if (distance >= 1 && !this.isFunctionCalled) {
      this.deleteContractAlert(contractId)
      this.isFunctionCalled = true;
    }
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
          handler: () => {
            this.isFunctionCalled = false;
            this.itemSlide.closeOpened()
          }
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteContract(contractId)
            this.isFunctionCalled = false;
            this.itemSlide.closeOpened()
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
