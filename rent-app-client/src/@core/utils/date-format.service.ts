import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateFormatService {
    constructor() { }

    turnTimestampOnYearMonthDay(timestamp: Date): string {
        const year = timestamp.getFullYear();
        const mounth = (timestamp.getMonth() + 1).toString().padStart(2, '0');
        const day = timestamp.getDate().toString().padStart(2, '0');
        return `${year}-${mounth}-${day}`;
    }

}
