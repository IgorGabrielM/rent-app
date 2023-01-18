import { Component, Input, OnInit } from '@angular/core';

export class DescriptionCardModel {
  value: string;
  products: string[];
  timeStart: string;
  timeEnd: string;
}

@Component({
  selector: 'omni-card-acordion',
  templateUrl: './omni-card-acordion.component.html',
  styleUrls: ['./omni-card-acordion.component.scss'],
})
export class OmniCardAcordionComponent implements OnInit {
  @Input() title: string;
  @Input() description: DescriptionCardModel;
  @Input() icon?: string;

  constructor() { }

  ngOnInit() { }

}
