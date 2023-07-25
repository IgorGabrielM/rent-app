import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'omni-button',
  templateUrl: './omni-button.component.html',
  styleUrls: ['./omni-button.component.scss'],
})
export class OmniButtonComponent implements OnInit {
  @Input() title: string
  @Input() type: 'primary' | 'outline'
  @Input() disabled: boolean

  constructor() { }

  ngOnInit() { }

}
