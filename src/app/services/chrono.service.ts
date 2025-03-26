import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  finalize,
  interval,
  Subscription,
  takeWhile,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChronoService {
  private countdown = new BehaviorSubject<string>('99:99');
  countdown$ = this.countdown.asObservable();
  private running = false;
  private timerSubscription: Subscription | null = null;

  startMinutesCountDown(minutes: number = 0, seconds: number = 0): void {
    if (this.running) return;
    this.running = true;

    let totalSeconds = minutes * 60 + seconds;
    this.countdown.next(this.formatTime(totalSeconds));
    this.timerSubscription = interval(1000)
      .pipe(
        takeWhile(() => totalSeconds > 0),
        finalize(() => this.stopCountdown())
      )
      .subscribe(() => {
        totalSeconds--;
        this.countdown.next(this.formatTime(totalSeconds));
      });
  }

  getSecondsLeft(): number {
    const timeParts = this.countdown.value.split(':');
    return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
  }

  stopCountdown(): void {
    console.log('unsubscribing');
    this.running = false;
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = null;
    this.countdown.next('00:00');
  }

  private formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
}
