import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { RoundsService } from './rounds.service';
import { TimeService } from './time.service';
import { WordsService } from './word.service';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root',
})
export class GameConfigService {
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

  constructor(
    private roundsService: RoundsService,
    private timeService: TimeService,
    private wordService: WordsService,
    private teamsService: TeamsService
  ) {}

  // ROUNDS
  get getRoundsNumber(): number {
    return this.roundsService.getRoundsNumber;
  }

  setRoundsNumber(rounds: number) {
    this.roundsService.setRoundsNumber(rounds);
  }

  get isLastRound(): boolean {
    return this.currentRound === this.getRoundsNumber - 1;
  }

  nextRound(): void {
    this.currentRound++;
  }

  // TIME
  get getTime(): number {
    return this.timeService.getTimeNumber;
  }

  setTime(time: number) {
    this.timeService.setTimeNumber(time);
  }

  // WORDS
  get getWordsNumber(): number {
    return this.wordService.getWordsNumber;
  }

  setWordsNumber(words: number) {
    this.wordService.setWordNumber(words);
  }

  get getWordsPool(): string[] {
    return this.wordService.getWordsPool;
  }

  // TEAMS
  getTeam(teamIndex: number): Team {
    return this.teamsService.getTeams[teamIndex];
  }

  get getTeams(): Team[] {
    return this.teamsService.getTeams;
  }

  setTeams(teams: Team[]) {
    this.teamsService.setTeams(teams);
  }

  nextTeam(): void {
    this.currentTeamIndex++;
    if (this.currentTeamIndex >= this.teamsService.getTeams.length) {
      this.currentTeamIndex = 0;
    }
  }

  setTeamScore(score: number): void {
    this.getTeam(this.currentTeamIndex).score[this.currentRound] += score;
  }

  getUniqueColor(teams: Team[]) {
    const assignedColors = teams.map((team) => team.color);
    const availableColors = this.colors.filter(
      (color) => !assignedColors.includes(color)
    );

    if (availableColors.length > 0) {
      return availableColors[0];
    }
    return this.colors[this.teamsService.getTeams.length % this.colors.length];
  }
}
