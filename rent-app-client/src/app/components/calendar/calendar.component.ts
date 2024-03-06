import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

export class DayModel {
  day: number
  mounth: string
  events?: {
    date: Date
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

  @Input() eventsDays: { date: Date, color: string, [key: string]: any; }[]

  isOpenSelectYear: boolean = false;

  years: number[] = []

  mounthsName: string[] = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  daysOfWeek: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  weeks: DayModel[][] = [];

  currentMonth: number;
  currentMonthName: string;
  currentYear: number;
  currentDay: number;

  selectedDay: Date;
  selectedYear: number
  selectedMonth: number;
  selectedMonthName: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.loadDate()
    this.generateCalendar(new Date());
    setTimeout(() => {
      this.loadEvents()
      this.generateYears()
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

  handleModal() {
    if (!this.isOpenSelectYear) {
      setTimeout(() => {
        this.router.navigate([], { fragment: this.selectedYear.toString() }).then(() => {
          const element = document.getElementById(this.selectedYear.toString());
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
          }
        });
      }, 100)
    }
    this.isOpenSelectYear = !this.isOpenSelectYear
  }

  generateYears(lastYear?: number) {
    if (!lastYear) {
      const date = new Date()
      const curentYear = date.getFullYear()
      for (let i = 1; i < 20; i++) {
        this.years.push(curentYear - i)
      }
      for (let i = 0; i < 20; i++) {
        this.years.push(curentYear + i)
      }
      this.years = this.years.sort((a, b) => a - b)
    }
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1500);
  }

  private generateItems() {
    const count = this.years[this.years.length - 1];
    for (let i = 0; i < 20; i++) {
      this.years.push(count + i);
    }
  }

  selectYear(year: number) {
    this.selectedYear = year
    this.weeks = []
    this.generateCalendar(new Date(this.selectedYear, this.selectedMonth, 1))
    setTimeout(() => {
      this.loadEvents()
    }, 500)
    this.isOpenSelectYear = !this.isOpenSelectYear
    this.currentMonth == this.selectedMonth && this.currentYear === this.selectedYear ? this.currentDay = new Date().getDate() : this.currentDay = undefined
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

    // Adicionar a última semana
    if (currentWeek.length > 0) {
      this.weeks.push(currentWeek);
    }

    // Preencher os dias do próximo mês
    const lastWeek = this.weeks[this.weeks.length - 1]
    if (lastWeek.length < 7) {
      for (let i = 1; lastWeek.length < 7; i += 1) {
        lastWeek.push({ day: i, mounth: this.mounthsName[(this.selectedMonth + 1)], events: [] })
      }
    }
  }

  loadEvents() {
    this.weeks.forEach((week) => {
      week.forEach((day) => {
        const events = this.eventsDays.filter((event) => event.date.getDate() === day.day && (event.date.getMonth() - 1) === this.selectedMonth && event.date.getFullYear() === this.selectedYear)
        if (events && events.length > 0) {
          events.forEach((event) => {
            if (event && day.mounth === this.currentMonthName) {
              day.events.push(event)
            }
          })
        }
      })
    })
  }

  getMonthYearString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const dateString = date.toLocaleDateString(undefined, options);
    return dateString;
  }

  clickDay(day: DayModel) {
    this.selectedDay = new Date(this.selectedYear, (this.mounthsName.findIndex((month) => month === day.mounth)), day.day)
    this.dayEvent.emit(day)
  }

  backMounth() {
    if (this.selectedMonth == 0) {
      this.selectedMonth = 11
      this.selectedMonthName = this.mounthsName[11]
      this.selectedYear -= 1

      this.weeks = []
      this.generateCalendar(new Date(this.selectedMonth))
      setTimeout(() => {
        this.loadEvents()
      }, 500)
      this.currentMonth == this.selectedMonth && this.currentYear === this.selectedYear ? this.currentDay = new Date().getDate() : this.currentDay = undefined

    } else {
      this.selectedMonth -= 1
      this.selectedMonthName = this.mounthsName[this.selectedMonth]

      this.weeks = []
      this.generateCalendar(new Date(this.selectedYear, this.selectedMonth, 1))
      setTimeout(() => {
        this.loadEvents()
      }, 500)
      this.currentMonth == this.selectedMonth && this.currentYear === this.selectedYear ? this.currentDay = new Date().getDate() : this.currentDay = undefined
    }
  }

  forwardMounth() {
    if (this.selectedMonth == 11) {
      this.selectedMonth = 0
      this.selectedMonthName = this.mounthsName[0]
      this.selectedYear += 1

      this.weeks = []
      this.generateCalendar(new Date(this.selectedMonth))
      setTimeout(() => {
        this.loadEvents()
      }, 500)
      this.currentMonth == this.selectedMonth && this.currentYear === this.selectedYear ? this.currentDay = new Date().getDate() : this.currentDay = undefined

    } else {
      this.selectedMonth += 1
      this.selectedMonthName = this.mounthsName[this.selectedMonth]

      this.weeks = []
      this.generateCalendar(new Date(this.selectedYear, this.selectedMonth, 1))
      setTimeout(() => {
        this.loadEvents()
      }, 500)
      this.currentMonth == this.selectedMonth && this.currentYear === this.selectedYear ? this.currentDay = new Date().getDate() : this.currentDay = undefined
    }
  }
}
