import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { AssetModel } from 'src/@core/models/asset.model';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetService } from 'src/@core/services/asset.service';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'asset-category-card',
  templateUrl: './asset-category-card.component.html',
  styleUrls: ['./asset-category-card.component.scss']
})
export class AssetCategoryCardComponent implements OnInit {
  @ViewChild('itemSlide', { static: true }) itemSlide: IonItemSliding;

  @Input() assetCategotry: AssetCategoryModel
  @Input() data?: string;
  @Input() queryParamData?: string

  assets: AssetModel[] = []
  assetsAvailable: AssetModel[] = []

  isFunctionCalled: boolean = false

  constructor(
    private assetService: AssetService,
    private assetCategoryService: AssetCategoryService,

    private toastService: ToastService,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.loadAssets()
  }

  loadAssets() {
    this.assetService.listByAssetCategory(String(this.assetCategotry.id)).subscribe((assets) => {
      this.assets = assets as AssetModel[]
      this.assetsAvailable = assets.filter((asset: AssetModel) => asset.is_available) as AssetModel[]
    })
  }

  slideToDelete(event: any, assetCategoryId: string) {
    const distance = event.detail.ratio;
    if (distance >= 1 && !this.isFunctionCalled) {
      this.deleteCategoryAssetAlert(assetCategoryId)
      this.isFunctionCalled = true;
    }
  }

  async deleteCategoryAssetAlert(assetCategoryId: string) {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: 'Deseja deletar a categoria do equipamento? Ela não podera ser restaurada posteriormente.',
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
            this.deleteCategoryAsset(assetCategoryId)
            this.isFunctionCalled = false;
            this.itemSlide.closeOpened()
          }
        }
      ]
    });
    await alert.present();
  }

  deleteCategoryAsset(assetCategoryId: string) {
    this.assetCategoryService.delete(assetCategoryId).then(() => {
      this.toastService.show('Successo', 'Categoria de equipamentos deletado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      });
    })
  }

}
