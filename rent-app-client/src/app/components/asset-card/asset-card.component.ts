import { Component, Input, OnInit } from '@angular/core';

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
  @Input() queryParam?: string

  constructor() { }

  ngOnInit() { }

}
