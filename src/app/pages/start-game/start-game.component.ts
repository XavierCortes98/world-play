import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
      rounds: 1,
      time: 5,
      words: 1,
      teams: this.fb.array(
        [this.fb.control('', Validators.required), this.fb.control('')],
        teamsValidator()
      ),
    });
  }

  get teams(): FormArray {
    return this.settingsForm.get('teams') as FormArray;
  }

  onFocusInput(index: number): void {
    if (index === this.teams.length - 1) {
      this.teams.at(index).setValidators(Validators.required);
      this.teams.at(index).updateValueAndValidity();
      this.teams.push(this.fb.control(''));
    }
  }

  removeEmptyTeam(index: number): void {
    if (index !== this.teams.length - 1) {
      const control = this.teams.at(index);
      if (!control.value || control.value.trim() === '') {
        this.teams.removeAt(index);
      }
    }
    if (this.teams.length === 1) {
      this.teams.at(0).setValidators(Validators.required);
      this.teams.at(index).updateValueAndValidity();
    }
  }

  startGame(): void {
    if (this.settingsForm.valid) {
      this.gameConfigService.setConfig(this.settingsForm.value);
    }
    this.router.navigate(['/game']);
  }

  teamValidator(): ValidationErrors | null {
    const filledTeams = this.teams.controls.filter(
      (control) => control.value && control.value.trim() !== ''
    );
    if (filledTeams.length < 2) {
      return { notEnoughTeams: true };
    }
    return null;
  }
}
