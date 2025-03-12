import { Team } from './team.model';

export interface GameConfig {
  rounds: number;
  time: number;
  words: number;
  teams: Team[];
  currentTeamIndex: number;
  currentRound: number;
  wordsPool: string[];
}
