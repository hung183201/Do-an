import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})

export class CustomDateAdapter extends NgbDateAdapter<Date> {
  convertDateAccordingToTimeZone(original: Date) {
    if (!original) {
      return null;
    }

    const offset = original.getTimezoneOffset();
    const offSetHourse = offset / 60;
    original.setHours(original.getHours() + (-offSetHourse));
  }

  isNumeric(value) {
    return /^\d+$/.test(value);
  }

  fromModel(date: Date): NgbDateStruct {
    if (!date || this.isNumeric(date))
      return null;

    const parseDate = Date.parse(date.toString());

    if (isNaN(parseDate)) {
      return null;
    }

    return { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
  }

  toModel(dateStruct: NgbDateStruct): Date {
    if (dateStruct) {
      return new Date(Date.UTC(dateStruct.year, dateStruct.month - 1, dateStruct.day));
    }

    return null;
  }
}