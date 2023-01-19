import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tool',
  templateUrl: './create-tool.page.html',
  styleUrls: ['./create-tool.page.scss'],
})
export class CreateToolPage implements OnInit {

  tools: any[] = [
    {
      name: 'Betoneira',
      value: '1',
    },
    {
      name: 'Escora',
      value: '2',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
