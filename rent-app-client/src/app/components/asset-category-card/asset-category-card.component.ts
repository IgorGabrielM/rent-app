import { Component, Input, OnInit } from '@angular/core';
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
  @Input() assetCategotry: AssetCategoryModel
  @Input() data?: string;
  @Input() queryParamData?: string

  assets: AssetModel[] = []
  assetsAvailable: AssetModel[] = []

  constructor(
    private assetService: AssetService,
    private assetCategoryService: AssetCategoryService,
    private toastService: ToastService,
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
