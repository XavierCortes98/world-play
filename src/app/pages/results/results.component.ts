import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  winnerTeam!: Team;

  constructor(private gameConfig: GameConfigService, private router: Router) {
    this.winnerTeam = this.calcWinnerTeam()!;
    console.log(this.winnerTeam);
  }

  calcWinnerTeam(): Team | undefined {
    const teams = this.gameConfig.getTeams;

    if (teams.length < 0) return;

    return teams.reduce((maxTeam, currentTeam) => {
      const currentScore = currentTeam.score.reduce((a, b) => a + b, 0);
      const maxScore = maxTeam.score.reduce((a, b) => a + b, 0);
      return currentScore > maxScore ? currentTeam : maxTeam;
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
