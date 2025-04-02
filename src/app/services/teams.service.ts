import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
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

  constructor() {}

  get getTeams(): Team[] {
    return [...this.teams];
  }

  setTeams(teams: Team[]) {
    teams.pop();
    this.teams = [...teams];
  }
}
