import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetModel } from 'src/@core/models/asset.model';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetService } from 'src/@core/services/asset.service';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-create-tool',
  templateUrl: './create-tool.page.html',
  styleUrls: ['./create-tool.page.scss'],
})
export class CreateToolPage implements OnInit {
  assetCategories: AssetCategoryModel[] = []
  asset: AssetModel
  idAssetToEdit: string

  constructor(
    private assetCategoryService: AssetCategoryService,
    private assetService: AssetService,
    private toastService: ToastService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadCategoriesAsset()
    this.getQueryParams()
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idAssetToEdit = params['id'];
      if (this.idAssetToEdit) {
        this.assetService.find(this.idAssetToEdit).then((asset) => {
          setTimeout(() => {
            this.asset = asset as AssetModel
          }, 1000)
        })
      } else {
        this.asset = new AssetModel()
      }
    });
  }

  loadCategoriesAsset() {
    this.assetCategoryService.list().subscribe((assetsCategories) => {
      this.assetCategories = assetsCategories as AssetCategoryModel[];
    });
  }

  onSubmit() {
    if (this.asset.identifier && this.asset.name && this.asset.id_asset_category) {
      if (!this.idAssetToEdit) {
        this.assetService.create(this.asset).then(() => {
          this.toastService.show('Sucesso', 'Equipamento criado com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.route.navigate(['/tabs/patrimony'])
          this.asset = new AssetModel()
        })
      } else {
        this.assetService.update({ ...this.asset, id: this.idAssetToEdit }).then(() => {
          this.toastService.show('Sucesso', 'Equipamento atualizado com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.route.navigate(['/tabs/patrimony'])
          this.asset = new AssetModel()
        })
      }
    } else {
      this.toastService.show('Erro', 'Preencha todos os campos!', {
        color: 'danger',
        duration: 2000,
        position: 'top',
      });
    }
  }

}
