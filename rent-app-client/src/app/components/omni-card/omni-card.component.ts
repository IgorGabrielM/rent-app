import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'omni-card',
  templateUrl: './omni-card.component.html',
  styleUrls: ['./omni-card.component.scss'],
})
export class OmniCardComponent implements OnInit {
  @Input() title: string;
  @Input() description: any;
  @Input() icon?: string;

  constructor() { }

  ngOnInit() { }

}
