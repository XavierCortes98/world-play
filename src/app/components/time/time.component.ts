import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameConfigService } from '../../services/game-config.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  time: number = 0;

  presetButtonsValues = [30, 45, 60, 90];

  constructor(private gameCofig: GameConfigService) {}

  ngOnInit() {
    this.time = this.gameCofig.getTime;
  }

  setTimeValue(time: number) {
    this.gameCofig.setTime(time);
  }
}
