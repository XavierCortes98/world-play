import { Component, OnInit } from '@angular/core';
import { GameConfigService } from '../../services/game-config.service';
import { Team } from 'src/app/models/team.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.rounds = this.gameConfigService.getRoundsNumber;
    this.time = this.gameConfigService.getTime;
    this.words = this.gameConfigService.getWordsNumber;
    this.teams = this.gameConfigService.getTeams;

    this.configItems = [
      {
        id: 'rounds',
        label: 'initSettings.rounds',
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

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
