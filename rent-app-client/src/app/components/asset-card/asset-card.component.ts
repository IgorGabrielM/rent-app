import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { AssetService } from 'src/@core/services/asset.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @ViewChild('itemSlide', { static: true }) itemSlide: IonItemSliding;

  @Input() title: string;
  @Input() description: any;
  @Input() icon?: string;
  @Input() data?: string;
  @Input() queryParamData?: string
  @Input() assetId?: string;

  isFunctionCalled: boolean = false

  constructor(
    private assetService: AssetService,
    private toastService: ToastService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  slideToDelete(event: any, assetId: string) {
    const distance = event.detail.ratio;
    if (distance >= 1 && !this.isFunctionCalled) {
      this.showAlertToDelete(assetId)
      this.isFunctionCalled = true;
    }
  }

  async showAlertToDelete(assetId: string) {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: 'Deseja deletar o equipamento? Ele não podera ser restaurado posteriormente.',
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
            this.deleteCategoryAsset(assetId)
            this.isFunctionCalled = false;
            this.itemSlide.closeOpened()
          }
        }
      ]
    });
    await alert.present();
  }

  deleteCategoryAsset(assetId: string) {
    this.assetService.delete(assetId).then(() => {
      this.toastService.show('Successo', 'Equipamento deletado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      });
    })
  }

}
