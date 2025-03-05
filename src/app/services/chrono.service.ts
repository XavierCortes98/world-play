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
  private countdown = new BehaviorSubject<string>('00:00');
  countdown$ = this.countdown.asObservable();
  private running = false;
  private timerSubscription: Subscription | null = null;

  startMinutesCountDown(minutes: number): void {
    if (this.running) return;
    console.log('service');
    this.running = true;

    let seconds = minutes * 60;
    this.timerSubscription = interval(1000)
      .pipe(
        takeWhile(() => seconds >= 0),
        finalize(() => this.stopCountdown())
      )
      .subscribe(() => {
        this.countdown.next(this.formatTime(seconds));
        seconds--;
      });
  }

  getSecondsLeft(): number {
    return parseInt(this.countdown.value.split(':')[1]);
  }

  stopCountdown(): void {
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
