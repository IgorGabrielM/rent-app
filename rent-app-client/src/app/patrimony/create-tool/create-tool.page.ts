import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private assetCategoryService: AssetCategoryService,
    private assetService: AssetService,
    private toastService: ToastService,
    private route: Router
  ) { }

  ngOnInit() {
    this.loadCategoriesAsset()
    this.asset = new AssetModel()
  }

  loadCategoriesAsset() {
    this.assetCategoryService.list().subscribe((assetsCategories) => {
      this.assetCategories = assetsCategories as AssetCategoryModel[];
    });
  }

  async onSubmit() {
    this.assetService.create(this.asset).then(() => {
      this.toastService.show('Sucesso', 'Equipamento criado com sucesso!', {
        color: 'success',
        duration: 3000,
        position: 'top',
      });
      this.route.navigate(['/tabs/patrimony'])
      this.asset = new AssetModel()
    })
  }

}
