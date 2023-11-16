import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AssetModel } from 'src/@core/models/asset.model';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetService } from 'src/@core/services/asset.service';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-edit-categories-and-tools',
  templateUrl: './edit-categories-and-tools.page.html',
  styleUrls: ['./edit-categories-and-tools.page.scss'],
})
export class EditCategoriesAndToolsPage implements OnInit {

  assetCategory: AssetCategoryModel
  assets: AssetModel[] = []
  assetCategoryId: string

  constructor(
    private assetCategoryService: AssetCategoryService,
    private assetService: AssetService,

    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getQueryParams()
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.loadAssetCategory(id)
      this.loadAssets(id)
      this.assetCategoryId = id
    });
  }

  loadAssetCategory(categoryAssetId: string) {
    this.assetCategoryService.find(categoryAssetId).then((assetCategory) => {
      this.assetCategory = assetCategory as AssetCategoryModel
    })
  }

  loadAssets(assetCategoryId: string) {
    this.assetService.listByAssetCategory(assetCategoryId).subscribe((assets) => {
      this.assets = assets as AssetModel[]
    })
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
          handler: () => { }
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteCategoryAsset(assetCategoryId)
          }
        }
      ]
    });
    await alert.present();
  }

  deleteCategoryAsset(assetCategoryId: string) {
    this.assetCategoryService.delete(assetCategoryId).then(() => {
      this.router.navigate(['/tabs/patrimony'])
      this.toastService.show('Successo', 'Categoria de equipamentos deletado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      });
    })
  }
}
