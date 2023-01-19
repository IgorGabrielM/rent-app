import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {
  codeQueryParam: string

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
