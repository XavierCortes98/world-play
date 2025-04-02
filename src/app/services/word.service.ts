import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WordData } from '../models/wordData.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  language = '';
  wordsNumber!: number;
  wordsPool!: WordData;

  private jsonUrl = 'assets/words.json';

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {
    localStorage.getItem('wordsNumber') === null
      ? (this.wordsNumber = 15)
      : (this.wordsNumber = Number(localStorage.getItem('wordsNumber')));
    this.setWordPool();
  }

  get getWordsNumber(): number {
    return this.wordsNumber;
  }

  setWordNumber(wordNumber: number) {
    this.wordsNumber = wordNumber;
    localStorage.setItem('wordsNumber', wordNumber.toString());
  }

  get getWordsPool(): string[] {
    return this.translateService.currentLang === 'es-ES'
      ? this.wordsPool.spanish
      : this.wordsPool.english;
  }

  setWordPool() {
    this.getRandomWords(this.wordsNumber).subscribe((response) => {
      this.wordsPool = response;
    });
  }

  getRandomWords(count: number): Observable<WordData> {
    return this.http.get<WordData>(this.jsonUrl).pipe(
      map((data) => {
        const indices = this.getRandomIndices(data.spanish.length, count);
        return {
          spanish: indices.map((i) => data.spanish[i]),
          english: indices.map((i) => data.english[i]),
        };
      })
    );
  }

  private getRandomIndices(max: number, count: number): number[] {
    const indices = Array.from(Array(max).keys());
    indices.sort(() => Math.random() - 0.5);
    return indices.slice(0, count);
  }
}
