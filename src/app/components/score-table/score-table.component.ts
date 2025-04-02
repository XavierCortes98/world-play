import { Component, OnInit } from '@angular/core';
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
}
