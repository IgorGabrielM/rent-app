import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
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

    private toastService: ToastService,
    private alertController: AlertController,
  ) { }

  ngOnInit() { }

  getValueOfQuantity(asset: AssetModel) {
    return Number(asset.assetCategory.value) * asset.quantity
  }

  getTotalValue(): number {
    let totalValue: number = 0;
    this.contract?.assetCategories.forEach((asset) => {
      totalValue += Number(asset.value) * asset.quantity;
    });
    return totalValue;
  }

  slideToDelete(event: any, contractId: string) {
    const distance = event.detail.ratio;
    if (distance >= 1 && !this.isFunctionCalled) {
      this.deleteContractAlert(contractId)
      this.isFunctionCalled = true;
    }
  }

  verifyIsExpired(): string {
    const currentDate = new Date()
    if (currentDate > new Date(this.contract.endDateLocate)) {
      return 'text-red-500'
    } else if (currentDate == new Date(this.contract.endDateLocate)) {
      return 'text-yellow-500'
    } else {
      return 'text-[color:var(--ion-color-tertiary-tint)]'
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
