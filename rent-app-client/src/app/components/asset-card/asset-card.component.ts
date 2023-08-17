import { Component, Input, OnInit } from '@angular/core';
import { AssetService } from 'src/@core/services/asset.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @Input() title: string;
  @Input() description: any;
  @Input() icon?: string;
  @Input() data?: string;
  @Input() queryParamData?: string
  @Input() assetId?: string;

  constructor(
    private assetService: AssetService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  deleteCategoryAsset(assetId: string) {
    this.assetService.delete(assetId).then(() => {
      this.toastService.show('Successo', 'Equipamento deletado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      });
    })
  }

}
