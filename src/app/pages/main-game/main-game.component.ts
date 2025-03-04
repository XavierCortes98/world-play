import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameConfig } from 'src/app/models/game-config.model';
import { ChronoService } from 'src/app/services/chrono.service';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
})
export class MainGameComponent implements OnInit, OnDestroy {
  private gameConfig: GameConfig = {
    rounds: 0,
    time: 0,
    words: 0,
    teams: [],
  };

  timeLeft = '00:00';

  constructor(
    private gameConfigService: GameConfigService,
    private chronoService: ChronoService
  ) {}

  ngOnInit(): void {
    this.gameConfig = this.gameConfigService.getConfig();

    this.chronoService.countdown$.subscribe((time) => {
      this.timeLeft = time;
    });
  }

  ngOnDestroy(): void {
    this.chronoService.stopCountdown();
  }

  start(): void {
    console.log('Game started');
    this.chronoService.startMinutesCountDown(this.gameConfig.time);
  }
}
