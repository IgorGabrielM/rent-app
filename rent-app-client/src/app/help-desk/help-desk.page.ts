import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.page.html',
  styleUrls: ['./help-desk.page.scss'],
})
export class HelpDeskPage implements OnInit {
  optionCriticity: any[] = [
    {
      name: 'Baixa',
      value: 'low',
    },
    {
      name: 'Media',
      value: 'medium',
    },
    {
      name: 'Alta',
      value: 'high',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
