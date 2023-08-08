import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetModel } from 'src/@core/models/asset.model';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetService } from 'src/@core/services/asset.service';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';

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
    private route: ActivatedRoute,
    private assetCategoryService: AssetCategoryService,
    private assetService: AssetService,
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

}
