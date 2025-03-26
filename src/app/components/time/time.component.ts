import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameConfigService } from '../../services/game-config.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  time: number = 0;

  presetButtonsValues = [30, 45, 60, 90];

  constructor(private gameConfigService: GameConfigService) {}

  ngOnInit() {
    this.time = this.gameConfigService.getTimeNumber;
  }

  setTimeValue(time: number) {
    this.gameConfigService.setTimeNumber(time);
  }
}
