import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  timeNumber!: number;

  constructor() {
    localStorage.getItem('timeNumber') === null
      ? (this.timeNumber = 60)
      : (this.timeNumber = Number(localStorage.getItem('timeNumber')));
  }

  get getTimeNumber(): number {
    return this.timeNumber;
  }

  setTimeNumber(time: number) {
    this.timeNumber = time;
    localStorage.setItem('timeNumber', time.toString());
  }
}
