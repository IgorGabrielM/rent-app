import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  idAssetCategoryToEdit: string

  constructor(
    private assetCategoryService: AssetCategoryService,

    private toastService: ToastService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getQueryParams()
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idAssetCategoryToEdit = params['id'];
      if (this.idAssetCategoryToEdit) {
        this.assetCategoryService.find(this.idAssetCategoryToEdit).then((assetCategory) => {
          setTimeout(() => {
            this.assetCategory = assetCategory as AssetCategoryModel
          }, 1000)
        })
      } else {
        this.assetCategory = new AssetCategoryModel()
      }
    });
  }

  verifyAllResponsed(): boolean {
    return !this.assetCategory.description || !this.assetCategory.value;
  }

  onSubmit() {
    if (this.assetCategory.description && this.assetCategory.value) {
      if (!this.idAssetCategoryToEdit) {
        this.assetCategoryService.create({ ...this.assetCategory }).then(() => {
          this.toastService.show('Sucesso', 'Cateogria de equipamento criada com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.route.navigate(['/tabs/patrimony'])
          this.assetCategory = new AssetCategoryModel()
        })
      } else {
        this.assetCategoryService.update({ ...this.assetCategory, id: this.idAssetCategoryToEdit }).then(() => {
          this.toastService.show('Sucesso', 'Cateogria de equipamento atualizada com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.route.navigate(['/tabs/patrimony'])
          this.assetCategory = new AssetCategoryModel()
        })
      }
    } else {
      this.toastService.show('Erro', 'Preencha todos os campos!', {
        color: 'danger',
        duration: 2000,
        position: 'top',
      })
    }
  }

}
