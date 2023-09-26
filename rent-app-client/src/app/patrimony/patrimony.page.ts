import { Component, OnInit } from '@angular/core';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';

@Component({
  selector: 'app-patrimony',
  templateUrl: './patrimony.page.html',
  styleUrls: ['./patrimony.page.scss'],
})
export class PatrimonyPage implements OnInit {

  assetCategories: AssetCategoryModel[] = []
  results: AssetCategoryModel[] = []

  constructor(
    private assetCategoryService: AssetCategoryService
  ) { }

  ngOnInit() {
    this.loadCategoriesAsset()
  }

  loadCategoriesAsset() {
    this.assetCategoryService.list().subscribe((assetsCategories) => {
      this.assetCategories = assetsCategories as AssetCategoryModel[]
      this.results = this.assetCategories
    })
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.assetCategories.filter((a) => a.description.toLowerCase().indexOf(query) > -1);
  }

}
