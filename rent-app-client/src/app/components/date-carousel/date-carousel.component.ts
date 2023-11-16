import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-carousel',
  templateUrl: './date-carousel.component.html',
  styleUrls: ['./date-carousel.component.scss']
})
export class DateCarouselComponent implements OnInit {
  @Output() daySelected: EventEmitter<number> = new EventEmitter();

  daysOfCurrentMonth: number[] = []
  currentDay: number
  daySelectedToClass: number

  ngOnInit(): void {
    this.getDaysOfCurrentMonth().then()
  }

  getDaysOfCurrentMonth(): Promise<void> {
    return new Promise((resolve) => {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      this.currentDay = currentDate.getDate()
      this.daySelectedToClass = this.currentDay
      this.daysOfCurrentMonth = [];

      for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
        this.daysOfCurrentMonth.push(day);
      }
      resolve();
    });
  }

  selectDay(day: number) {
    this.daySelected.emit(day);
    this.daySelectedToClass = day
  }

}
