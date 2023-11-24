import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'omni-button',
  templateUrl: './omni-button.component.html',
  styleUrls: ['./omni-button.component.scss'],
})
export class OmniButtonComponent implements OnInit {
  @Input() title: string
  @Input() type: 'primary' | 'outline' | 'success' | 'danger'
  @Input() disabled: boolean
  @Input() function?: Function

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit() { }
}
