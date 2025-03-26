import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  words!: number;

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.words = this.wordService.getWordsNumber;
    this.wordService.setWordPool(this.words);
  }

  setWordsValue(wordsValue: number) {
    this.wordService.setWordNumber(wordsValue);
  }
}
