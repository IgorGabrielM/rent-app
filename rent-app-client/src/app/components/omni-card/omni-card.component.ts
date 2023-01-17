import { Component, Input, OnInit } from '@angular/core';

export class DescriptionCardModel {
  value: string;
  products: string[];
  timeStart: string;
  timeEnd: string;
}

@Component({
  selector: 'omni-card',
  templateUrl: './omni-card.component.html',
  styleUrls: ['./omni-card.component.scss'],
})
export class OmniCardComponent implements OnInit {
  @Input() title: string;
  @Input() description: DescriptionCardModel;
  @Input() icon?: string;

  constructor() { }

  ngOnInit() { }

}
