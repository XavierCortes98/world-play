import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class GameConfigService {
  roundsNumber = 3;
  timeNumber = 6;

  teams: Team[] = [
    {
      name: 'Abc',
      score: [0, 0, 0],
      color: '#87CEEB',
    },
    {
      name: 'def',
      score: [0, 0, 0],
      color: '#EC3B3B',
    },
  ];
  currentTeamIndex = 0;
  currentRound = 0;
  colors = [
    '#87CEEB',
    '#EC3B3B',
    '#8AF259',
    '#228B22',
    '#F4E345',
    '#F175E1',
    '#FF8C00',
  ];

  constructor() {}

  get getRoundsNumber(): number {
    return this.roundsNumber;
  }

  setRoundsNumber(rounds: number) {
    this.roundsNumber = rounds;
  }

  get getTimeNumber(): number {
    return this.timeNumber;
  }

  setTimeNumber(time: number) {
    this.timeNumber = time;
  }

  get getTeams(): Team[] {
    return this.teams;
  }

  setTeams(teams: Team[]) {
    teams.pop();
    this.teams = teams;
  }

  get getTeam(): Team {
    return this.teams[this.currentTeamIndex];
  }

  get isLastRound(): boolean {
    return this.currentRound === this.roundsNumber - 1;
  }

  nextRound(): void {
    this.currentRound++;
  }

  nextTeam(): void {
    this.currentTeamIndex++;
    if (this.currentTeamIndex >= this.teams.length) {
      this.currentTeamIndex = 0;
    }
  }

  setTeamScore(score: number): void {
    this.teams[this.currentTeamIndex].score[this.currentRound] += score;
  }

  getUniqueColor(teams: Team[]) {
    const assignedColors = teams.map((team) => team.color);
    const availableColors = this.colors.filter(
      (color) => !assignedColors.includes(color)
    );

    if (availableColors.length > 0) {
      return availableColors[0];
    }
    return this.colors[this.teams.length % this.colors.length];
  }
}
