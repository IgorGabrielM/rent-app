import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.page.html',
  styleUrls: ['./create-contract.page.scss'],
})
export class CreateContractPage implements OnInit {
  codeQueryParam: string

  tools: any[] = [
    {
      name: 'Betoneira',
      value: '1'
    },
    {
      name: 'Escora',
      value: '2'
    },
  ]

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getQueryParam()
  }

  getQueryParam() {
    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      this.codeQueryParam = queryParams['id'];
    });
  }

}
