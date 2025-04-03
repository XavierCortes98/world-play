import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss'],
})
export class ScoreTableComponent implements OnInit {
  rondas: number[] = [];
  constructor(public gameConfigService: GameConfigService) {}

  ngOnInit() {
    this.rondas = Array.from(
      { length: this.gameConfigService.getRoundsNumber },
      (_, i) => i + 1
    );
  }
  getTotalScore(team: Team): number {
    return team.score.reduce((acc: number, curr: number) => acc + (curr || 0), 0);
  }
}
