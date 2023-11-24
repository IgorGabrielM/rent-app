import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @ViewChild('itemSlide', { static: true }) itemSlide: IonItemSliding;

  @Input() title: string;
  @Input() description: any;
  @Input() icon?: string;
  @Input() data?: string;
  @Input() queryParamData?: string
  @Input() assetId?: string;

  constructor(
  ) { }

  ngOnInit() {
  }
}
