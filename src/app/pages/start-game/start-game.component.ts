import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { GameConfigService } from 'src/app/services/game-config.service';
import { teamsValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gameConfigService: GameConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      rounds: [1, [Validators.required, Validators.min(1)]],
      time: [1, [Validators.required, Validators.min(1)]],
      words: [1, [Validators.required, Validators.min(1)]],
      teams: this.fb.array(
        [this.createTeamFormGroup(), this.createTeamFormGroup()],
        teamsValidator()
      ),
    });
  }

  createTeamFormGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      score: [[]],
      color: ['#d1b05c'],
    });
  }

  get teams(): FormArray {
    return this.settingsForm.get('teams') as FormArray;
  }

  onFocusInput(index: number): void {
    if (index === this.teams.length - 1) {
      const teamGroup = this.teams.at(index) as FormGroup;
      teamGroup.get('name')?.setValidators(Validators.required);
      teamGroup.get('name')?.updateValueAndValidity();
      this.teams.push(this.createTeamFormGroup());
    }
  }

  onBlurInput(index: number): void {
    const teamGroup = this.teams.at(index) as FormGroup;
    const teamName = teamGroup.get('name')?.value.trim();

    if (teamName !== '') {
      teamGroup.get('name')?.setValidators(Validators.required);
      teamGroup.get('name')?.updateValueAndValidity();
    } else if (this.teams.length > 2) {
      this.teams.removeAt(index);
    }
  }

  startGame(): void {
    if (this.settingsForm.valid) {
      const config = {
        ...this.gameConfigService.getConfig,
        ...this.settingsForm.value,
      };

      config.teams = config.teams.map((team: Team) => ({
        ...team,
        score: new Array(config.rounds).fill(0),
      }));

      this.gameConfigService.setConfig(config);
    }
    this.router.navigate(['/game']);
  }
}
