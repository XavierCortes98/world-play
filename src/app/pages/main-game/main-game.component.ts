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
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  countdownSubscription: Subscription | null = null;
  isInputDisabled = false;
  animateCorrect = false;
  remainingTime = 0;
  currentWord = '';
  score = 0;

  currentTeam: Team = {
    name: '',
    score: [],
    color: '',
  };

  timeLeft = '99:99';

  copyWordPool = [''];

  constructor(
    private gameConfigService: GameConfigService,
    private chronoService: ChronoService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.gameConfigService.getTeam(
      this.gameConfigService.currentTeamIndex
    );

    this.copyWordPool = this.gameConfigService.getWordsPool;
    this.currentWord =
      this.copyWordPool[Math.floor(Math.random() * this.copyWordPool.length)];

    this.chronoService.startMinutesCountDown(0, this.gameConfigService.getTime);
    this.countdownSubscription = this.chronoService.countdown$.subscribe(
      (time) => {
        this.timeLeft = time;
        this.updateTimerUI();
      }
    );
  }

  ngOnDestroy(): void {
    this.countdownSubscription?.unsubscribe();
    this.chronoService.stopCountdown();
  }

  get currentRound(): number {
    return this.gameConfigService.currentRound;
  }

  updateTimerUI() {
    const timeContainer = document.getElementById('timeContainer');
    if (this.chronoService.getSecondsLeft() <= 0) {
      this.endOfRound();
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
      if (this.copyWordPool.length === 0) {
        this.endOfRound();
      }
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

  missWord() {
    this.endOfRound();
  }

  endOfRound(): void {
    this.remainingTime = this.chronoService.getSecondsLeft();
    this.countdownSubscription?.unsubscribe();
    this.countdownSubscription = null;
    this.chronoService.stopCountdown();
    this.gameConfigService.setTeamScore(this.score);
    if (this.copyWordPool.length > 0) {
      this.gameConfigService.nextTeam();
    }
    if (this.gameConfigService.isLastRound && this.copyWordPool.length === 0) {
      // Lógica para finalizar el juego, por ejemplo navegar a la pantalla de resultados finales
      this.router.navigate(['/results']);
    } else {
      this.dialog
        .open(RoundTransitionComponent, {
          width: '630px',
          height: '85%',
          disableClose: true,
          data: {
            remainingWords: this.copyWordPool,
          },
        })
        .afterClosed()
        .subscribe(() => {
          this.newRound();
        });
    }
  }

  newRound(): void {
    this.score = 0;

    if (this.copyWordPool.length === 0) {
      this.copyWordPool = this.gameConfigService.getWordsPool;
      this.chronoService.startMinutesCountDown(0, this.remainingTime);
      this.countdownSubscription = this.chronoService.countdown$.subscribe(
        (time) => {
          this.timeLeft = time;
          this.updateTimerUI();
        }
      );
      this.gameConfigService.nextRound();
    } else if (this.chronoService.getSecondsLeft() <= 0) {
      this.chronoService.startMinutesCountDown(
        0,
        this.gameConfigService.getTime
      );
      this.countdownSubscription = this.chronoService.countdown$.subscribe(
        (time) => {
          this.timeLeft = time;
          this.updateTimerUI();
        }
      );

      this.currentTeam = this.gameConfigService.getTeam(
        this.gameConfigService.currentTeamIndex
      );
    }

    this.currentWord =
      this.copyWordPool[Math.floor(Math.random() * this.copyWordPool.length)];
  }
}
