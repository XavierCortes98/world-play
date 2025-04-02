import { Component, OnInit } from '@angular/core';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  wordsNumber!: number;

  constructor(private gameConfig: GameConfigService) {}

  ngOnInit(): void {
    this.wordsNumber = this.gameConfig.getWordsNumber;
  }

  setWordsValue(wordsValue: number) {
    this.gameConfig.setWordsNumber(wordsValue);
  }
}
