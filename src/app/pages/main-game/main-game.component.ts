import {
  trigger,
  transition,
  style,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { GameConfigService } from 'src/app/services/game-config.service';
import { ChronoService } from 'src/app/services/chrono.service';
import { Team } from 'src/app/models/team.model';
import { MatDialog } from '@angular/material/dialog';
import { RoundTransitionComponent } from 'src/app/components/round-transition/round-transition.component';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
  animations: [
    trigger('wordAnimation', [
      transition('in => nextOut', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateX(-100px)' })
        ),
      ]),
      transition('in => correctOut', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateX(100px)' })
        ),
      ]),
      transition('* => in', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class MainGameComponent implements OnInit, OnDestroy {
  animationState: 'in' | 'nextOut' | 'correctOut' = 'in';
  isInputDisabled = false;
  animateCorrect = false;
  currentWord = '';
  score = 0;
  currentTeam: Team = {
    name: '',
    score: [],
    color: '',
  };
  timeLeft = '00:00';

  copyWordPool = [''];

  constructor(
    private gameConfigService: GameConfigService,
    private chronoService: ChronoService,
    private dialog: MatDialog
  ) {
    this.chronoService.countdown$.subscribe((time) => {
      this.timeLeft = time;
      this.updateTimerUI();
    });
  }

  ngOnInit(): void {
    this.currentTeam = this.gameConfigService.getTeam;
    this.copyWordPool = this.gameConfigService.getWordsPool;
    this.currentWord =
      this.copyWordPool[Math.floor(Math.random() * this.copyWordPool.length)];

    this.chronoService.startMinutesCountDown(this.gameConfigService.getTime);
  }

  ngOnDestroy(): void {
    this.chronoService.stopCountdown();
  }

  updateTimerUI() {
    const timeContainer = document.getElementById('timeContainer');
    console.log(this.chronoService.getSecondsLeft());
    if (this.chronoService.getSecondsLeft() <= 0) {
      this.dialog.open(RoundTransitionComponent, {
        width: '400px',
      });
    }

    if (this.chronoService.getSecondsLeft() <= 10) {
      timeContainer?.classList.add('low-time');
    } else {
      timeContainer?.classList.remove('low-time');
    }
  }

  handleWord(isCorrect: boolean): void {
    if (this.isInputDisabled) return;

    this.isInputDisabled = true;
    if (isCorrect) {
      this.score++;
      this.animateCorrect = true;
      this.animationState = 'correctOut';
      this.copyWordPool = this.copyWordPool.filter(
        (word) => word !== this.currentWord
      );
    } else {
      this.animationState = 'nextOut';
    }
  }

  wordAnimationDone(event: AnimationEvent): void {
    if (
      event.fromState === 'in' &&
      (event.toState === 'nextOut' || event.toState === 'correctOut')
    ) {
      this.currentWord =
        this.copyWordPool[Math.floor(Math.random() * this.copyWordPool.length)];

      this.animationState = 'in';
      this.isInputDisabled = false;
    }
  }

  nextWord(): void {
    this.handleWord(false);
  }

  correctWord(): void {
    this.handleWord(true);
  }

  start(): void {}
}
