import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-create-tool-category',
  templateUrl: './create-tool-category.page.html',
  styleUrls: ['./create-tool-category.page.scss'],
})
export class CreateToolCategoryPage implements OnInit {
  assetCategory: AssetCategoryModel

  constructor(
    private assetCategoryService: AssetCategoryService,
    private toastService: ToastService,
    private route: Router
  ) { }

  ngOnInit() {
    this.assetCategory = new AssetCategoryModel()
  }

  verifyAllResponsed(): boolean {
    return !this.assetCategory.description || !this.assetCategory.value;
  }

  onSubmit() {
    console.log(this.assetCategory)
    this.assetCategoryService.create({ ...this.assetCategory }).then(() => {
      this.toastService.show('Sucesso', 'Equipamento criado com sucesso!', {
        color: 'success',
        duration: 3000,
        position: 'top',
      });
      this.route.navigate(['/tabs/patrimony'])
      this.assetCategory = new AssetCategoryModel()
    })
  }

}
