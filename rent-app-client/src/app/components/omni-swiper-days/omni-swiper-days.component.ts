import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnyMxRecord } from 'dns';

@Component({
  selector: 'omni-swiper-days',
  templateUrl: './omni-swiper-days.component.html',
  styleUrls: ['./omni-swiper-days.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OmniSwiperDaysComponent implements OnInit {

  mouth: any
  dayNow: any


  constructor() { }

  ngOnInit() { }

  loadDatas() {

  }

}
