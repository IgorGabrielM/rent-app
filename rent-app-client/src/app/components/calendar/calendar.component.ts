import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class DayModel {
  day: number
  mounth: string
  events?: {
    color: string
    [key: string]: any;
  }[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  @Output() dayEvent: EventEmitter<DayModel> = new EventEmitter<DayModel>();

  @Input() eventsDays: { day: number, color: string, [key: string]: any; }[]

  isOpenPopover: boolean = false;

  mounthsName: string[] = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  daysOfWeek: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  weeks: DayModel[][] = [];

  currentMonth: number;
  currentMonthName: string;
  currentYear: number;
  currentDay: number;

  selectedDay: number;
  selectedYear: number

  selectedMonth: number;
  selectedMonthName: string;


  ngOnInit() {
    this.generateCalendar(new Date());
    setTimeout(() => {
      this.loadEvents()
      this.loadDate()
    }, 500)
  }

  loadDate() {
    const date = new Date()
    this.currentDay = date.getDate();
    this.currentMonthName = this.mounthsName[date.getMonth()]
    this.currentMonth = date.getMonth()
    this.currentYear = date.getFullYear()

    if (this.selectedMonth == undefined) {
      this.selectedMonth = this.currentMonth
      this.selectedMonthName = this.currentMonthName
    }
    if (this.selectedYear == undefined) {
      this.selectedYear = this.currentYear
    }
  }

  generateCalendar(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();

    let currentDay = firstDayOfMonth;
    let currentWeek: DayModel[] = [];

    // Preencher os dias do mês anterior
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = new Date(firstDayOfMonth);
      day.setDate(day.getDate() - (firstDayOfWeek - i));
      currentWeek.push({ day: day.getDate(), mounth: this.mounthsName[date.getMonth() - 1], events: [] });
    }

    // Preencher os dias do mês atual
    while (currentDay <= lastDayOfMonth) {
      currentWeek.push({ day: currentDay.getDate(), mounth: this.mounthsName[date.getMonth()], events: [] });

      if (currentDay.getDay() === 6) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }

    // Preencher os dias do próximo mês
    for (let i = currentWeek.length; i < 7; i++) {
      const day = new Date(lastDayOfMonth);

      day.setDate(i - 4);
      currentWeek.push({ day: day.getDate(), mounth: this.mounthsName[date.getMonth() + 1], events: [] });
    }

    // Adicionar a última semana
    if (currentWeek.length > 0) {
      this.weeks.push(currentWeek);
    }
  }

  loadEvents() {
    this.weeks.forEach((week) => {
      week.forEach((day) => {
        const events = this.eventsDays.filter((event) => event.day === day.day)
        events.forEach((event) => {
          if (event && day.mounth === this.currentMonthName) {
            day.events.push(event)
          }
        })
      })
    })
  }

  getMonthYearString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const dateString = date.toLocaleDateString(undefined, options);
    return dateString;
  }

  clickDay(day: DayModel) {
    if (day.mounth === this.currentMonthName) {
      this.selectedDay = day.day
      this.dayEvent.emit(day)
    }
  }

  backMounth() {
    if (this.selectedMonth == 0) {
      this.selectedMonth = 11
      this.selectedMonthName = this.mounthsName[11]
      this.selectedYear -= 1

      this.weeks = []
      this.generateCalendar(new Date(this.selectedMonth))
      this.currentMonth == this.selectedMonth ? this.currentDay = new Date().getDate() : this.currentDay = undefined

    } else {
      this.selectedMonth -= 1
      this.selectedMonthName = this.mounthsName[this.selectedMonth]

      this.weeks = []
      this.generateCalendar(new Date(this.selectedYear, this.selectedMonth, 1))
      this.currentMonth == this.selectedMonth ? this.currentDay = new Date().getDate() : this.currentDay = undefined
    }
  }

  forwardMounth() {
    if (this.selectedMonth == 11) {
      this.selectedMonth = 0
      this.selectedMonthName = this.mounthsName[0]
      this.selectedYear += 1

      this.weeks = []
      this.generateCalendar(new Date(this.selectedMonth))
      this.currentMonth == this.selectedMonth ? this.currentDay = new Date().getDate() : this.currentDay = undefined

    } else {
      this.selectedMonth += 1
      this.selectedMonthName = this.mounthsName[this.selectedMonth]

      this.weeks = []
      this.generateCalendar(new Date(this.selectedYear, this.selectedMonth, 1))
      this.currentMonth == this.selectedMonth ? this.currentDay = new Date().getDate() : this.currentDay = undefined
    }
  }
}
