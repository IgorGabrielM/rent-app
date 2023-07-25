import { Component, OnInit } from '@angular/core';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';

@Component({
  selector: 'app-patrimony',
  templateUrl: './patrimony.page.html',
  styleUrls: ['./patrimony.page.scss'],
})
export class PatrimonyPage implements OnInit {

  data = [
    {
      title: 'Escoras',
      description: {
        data1: 'R$10,00',
        data2: '01/10',
        data3: '(Disponiveis)'
      }
    },
    {
      title: 'Betoneiras',
      description: {
        data1: 'R$10,00',
        data2: '01/10',
        data3: '(Disponiveis)'
      }
    }
  ]

  assetCategories: AssetCategoryModel[] = []

  constructor(
    private assetCategoryService: AssetCategoryService
  ) { }

  ngOnInit() {
    this.loadCategoriesAsset()
  }

  loadCategoriesAsset() {
    this.assetCategoryService.list().subscribe((assetsCategories) => {
      this.assetCategories = assetsCategories as AssetCategoryModel[]
    })
  }

}
