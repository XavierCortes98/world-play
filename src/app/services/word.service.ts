import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WordData } from '../models/wordData.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  language = '';
  wordsNumber = 15;
  wordsPool!: WordData;

  private jsonUrl = 'assets/words.json';

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  get getWordsNumber(): number {
    return this.wordsNumber;
  }

  setWordNumber(wordNumber: number) {
    console.log('word number: ', wordNumber);
    this.wordsNumber = wordNumber;
    this.setWordPool(wordNumber);
  }

  setWordPool(words: number) {
    this.getRandomWords(words).subscribe((response) => {
      this.wordsPool = response;
      console.log('word pool: ', this.wordsPool);
    });
  }

  get getWordsPool(): string[] {
    return this.translateService.currentLang === 'es-ES'
      ? this.wordsPool.spanish
      : this.wordsPool.english;
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
