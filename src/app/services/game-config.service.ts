import { Injectable } from '@angular/core';
import { GameConfig } from '../models/game-config.model';

@Injectable({
  providedIn: 'root',
})
export class GameConfigService {
  private gameConfig: GameConfig = {
    rounds: 0,
    time: 0,
    words: 0,
    teams: [],
  };

  constructor() {}

  setConfig(config: GameConfig): void {
    this.gameConfig = config;
  }

  getConfig(): GameConfig {
    return this.gameConfig;
  }
}
