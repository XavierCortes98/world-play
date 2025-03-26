import { Component, OnInit } from '@angular/core';
import { GameConfigService } from '../../services/game-config.service';
import { Team } from 'src/app/models/team.model';
import { Router } from '@angular/router';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  rounds!: number;
  time!: number;
  words!: number;
  teams!: Team[];

  configItems: { id: string; label: string; value: number; route: string }[] =
    [];

  constructor(
    public gameConfigService: GameConfigService,
    private wordService: WordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rounds = this.gameConfigService.getRoundsNumber;
    this.time = this.gameConfigService.getTimeNumber;
    this.words = this.wordService.getWordsNumber;
    this.teams = this.gameConfigService.getTeams;
    console.log(this.teams);

    this.configItems = [
      {
        id: 'rounds',
        label: 'initSettings.teams',
        value: this.rounds,
        route: 'rounds',
      },
      {
        id: 'time',
        label: 'initSettings.time',
        value: this.time,
        route: 'time',
      },
      {
        id: 'words',
        label: 'initSettings.words',
        value: this.words,
        route: 'words',
      },
    ];
  }

  navPage(route: string) {
    this.router.navigate(['/' + route]);
  }

  nextPage() {
    this.router.navigate(['/game']);
  }
  prevPage() {
    this.router.navigate(['/teams']);
  }
}
