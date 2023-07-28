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

  dataCategory = [
    {
      id: '1',
      title: 'Escoras',
      description: {
        data0: 'Valor unitário:',
        data1: 'R$10,00',
        data2: '01/02',
        data3: '(Disponíveis)'
      }
    },
  ]

  dataTools = [
    {
      id: '1',
      title: 'Escora Gerdau',
      description: {
        data1: '0001',
      }
    },
    {
      id: '2',
      title: 'Escora Menegoti',
      description: {
        data1: '0002',
      }
    },
  ]

  assetCategory: AssetCategoryModel
  assets: AssetModel[] = []

  constructor(
    private route: ActivatedRoute,
    private assetCategoryService: AssetCategoryService,
    private assetService: AssetService,
  ) { }

  ngOnInit() {
    this.getQueryParams()
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.loadAssetCategory(id)
    });
  }

  loadAssetCategory(categoryAssetId: string) {
    this.assetCategoryService.find(categoryAssetId).then((assetCategory) => {
      this.assetCategory = assetCategory as AssetCategoryModel
      console.log(this.assetCategory)
      //this.loadAssets(this.assetCategory.id)
    })
  }

  loadAssets(assetCategoryId: string) {
    this.assetService.listByAssetCategory(this.assetCategory.id).subscribe((assets) => {
      this.assets = assets as AssetModel[]
      console.log(this.assets)
    })
  }

}
