import { Injectable } from '@angular/core';
import { GameConfig } from '../models/game-config.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class GameConfigService {
  private gameConfig: GameConfig = {
    rounds: 0,
    time: 0,
    words: 0,
    teams: [],
    currentTeamIndex: 0,
    currentRound: 1,
    wordsPool: [
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
    ],
  };

  constructor() {}

  get getConfig(): GameConfig {
    return this.gameConfig;
  }

  get getTime(): number {
    return this.gameConfig.time;
  }

  get getWordsPool(): string[] {
    return this.gameConfig.wordsPool;
  }

  get getTeam(): Team {
    return this.gameConfig.teams[this.gameConfig.currentTeamIndex];
  }

  setConfig(config: GameConfig): void {
    this.gameConfig = config;
  }

  setTeamScore(score: number): void {
    this.gameConfig.teams[this.gameConfig.currentTeamIndex].score[
      this.gameConfig.currentRound
    ] = score;
  }
}
