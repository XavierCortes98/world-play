import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoundsService {
  roundsNumber!: number;

  constructor() {
    localStorage.getItem('roundsNumber') === null
      ? (this.roundsNumber = 3)
      : (this.roundsNumber = Number(localStorage.getItem('roundsNumber')));
  }

  get getRoundsNumber(): number {
    return this.roundsNumber;
  }

  setRoundsNumber(rounds: number) {
    this.roundsNumber = rounds;
    localStorage.setItem('roundsNumber', rounds.toString());
  }
}
