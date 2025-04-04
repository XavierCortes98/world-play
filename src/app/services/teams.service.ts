import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  teams: Team[] = [];

  constructor() {}

  get getTeams(): Team[] {
    return [...this.teams];
  }

  setTeams(teams: Team[]) {
    teams.pop();
    this.teams = [...teams];
  }
}
