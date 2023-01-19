import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'omni-input',
  templateUrl: './omni-input.component.html',
  styleUrls: ['./omni-input.component.scss'],
})
export class OmniInputComponent implements OnInit {
  @Input() placeholder: string
  @Input() data: any
  @Input() isSelect?: boolean
  @Input() options?: any[]

  constructor() { }

  ngOnInit() { }

}
