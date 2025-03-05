import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameConfig } from 'src/app/models/game-config.model';
import { ChronoService } from 'src/app/services/chrono.service';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
  animations: [
    trigger('wordAnimation', [
      // Animación de salida para Next Word: sale hacia la izquierda
      transition('in => nextOut', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateX(-100px)' })
        ),
      ]),
      // Animación de salida para Correct Word: sale hacia la derecha
      transition('in => correctOut', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateX(100px)' })
        ),
      ]),
      // Animación de entrada: la nueva palabra aparece desde la izquierda
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
  private gameConfig: GameConfig = {
    rounds: 0,
    time: 0,
    words: 0,
    teams: [],
  };
  animationState: 'in' | 'nextOut' | 'correctOut' = 'in';
  isDisabled = false;
  currentWord = '';
  animateCorrect = false;
  words = [
    'manzana',
    'perro',
    'casa',
    'sol',
    'mar',
    'libro',
    'cielo',
    'montaña',
    'rio',
    'estrella',
  ];
  correctWords = 0;

  timeLeft = '00:00';

  constructor(
    private gameConfigService: GameConfigService,
    private chronoService: ChronoService
  ) {}

  ngOnInit(): void {
    this.gameConfig = this.gameConfigService.getConfig();
    this.currentWord = this.words[0];
    this.chronoService.countdown$.subscribe((time) => {
      this.timeLeft = time;
      this.updateTimerUI();
    });
  }

  ngOnDestroy(): void {
    this.chronoService.stopCountdown();
  }

  updateTimerUI() {
    const timeContainer = document.getElementById('timeContainer');
    if (this.chronoService.getSecondsLeft() <= 55) {
      timeContainer?.classList.add('low-time');
    } else {
      timeContainer?.classList.remove('low-time');
    }
  }

  handleWord(isCorrect: boolean): void {
    if (this.isDisabled) return;

    this.isDisabled = true;
    if (isCorrect) {
      this.correctWords++;
      this.animateCorrect = true;
      // La palabra saldrá hacia la derecha
      this.animationState = 'correctOut';
    } else {
      // La palabra saldrá hacia la izquierda
      this.animationState = 'nextOut';
    }

    // Espera a que termine la animación de salida (300ms) para actualizar la palabra
    setTimeout(() => {
      this.words.shift();
      this.currentWord = this.words[0] || '';
      this.animationState = 'in';
    }, 400);
  }

  wordAnimationDone(): void {
    this.isDisabled = false;
  }

  nextWord(): void {
    this.handleWord(false);
  }

  correctWord(): void {
    this.handleWord(true);
  }

  start(): void {
    this.chronoService.startMinutesCountDown(this.gameConfig.time);
  }
}
