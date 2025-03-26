import { Component, OnInit } from '@angular/core';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
})
export class RoundsComponent implements OnInit {
  rounds = 0;
  presetButtonsValues = [1, 2, 3, 4, 5];
  constructor(private gameConfigService: GameConfigService) {}

  ngOnInit(): void {
    this.rounds = this.gameConfigService.getRoundsNumber;
  }

  setRoundValue(rounds: number) {
    this.gameConfigService.setRoundsNumber(rounds);
  }
}
