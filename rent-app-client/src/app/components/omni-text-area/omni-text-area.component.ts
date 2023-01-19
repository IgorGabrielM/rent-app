import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'omni-text-area',
  templateUrl: './omni-text-area.component.html',
  styleUrls: ['./omni-text-area.component.scss'],
})
export class OmniTextAreaComponent implements OnInit {
  @Input() placeholder: string;
  @Input() heightData: string

  constructor() { }

  ngOnInit() { }

}
