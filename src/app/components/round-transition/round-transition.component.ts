import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Team } from 'src/app/models/team.model';
import { GameConfigService } from 'src/app/services/game-config.service';

@Component({
  selector: 'app-round-transition',
  templateUrl: './round-transition.component.html',
  styleUrls: ['./round-transition.component.scss'],
})
export class RoundTransitionComponent implements OnInit {
  rondas: number[] = [];
  nextTeam!: Team;
  nextRound = false;
  language!: string;
  constructor(
    public dialogRef: MatDialogRef<RoundTransitionComponent>,
    public gameConfigService: GameConfigService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.getBrowserCultureLang() || 'en-US';
    console.log('lang: ', this.language);
    this.rondas = Array.from(
      { length: this.gameConfigService.getRoundsNumber },
      (_, i) => i + 1
    );
    this.nextTeam = this.gameConfigService.getTeam;
  }

  close(): void {
    this.dialogRef.close();
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.language = language;
  }
}
