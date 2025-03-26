import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { GameConfigService } from 'src/app/services/game-config.service';
import { teamsValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teamForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gameConfigService: GameConfigService
  ) {}

  ngOnInit() {
    this.teamForm = this.fb.group({
      teams: this.fb.array([], teamsValidator()),
    });

    const serviceTeams = this.gameConfigService.getTeams;

    if (serviceTeams.length) {
      serviceTeams.forEach((team) => this.teams.push(this.createTeam(team)));
      this.teams.push(this.createTeam());
    } else {
      this.teams.push(this.createTeam());
      this.teams.push(this.createTeam());
    }
  }

  createTeam(team?: Team): FormGroup {
    return this.fb.group({
      name: [team?.name || ''],
      score: [
        team?.score ||
          new Array(this.gameConfigService.getRoundsNumber).fill(0),
      ],
      color: [
        team?.color ||
          this.gameConfigService.getUniqueColor(
            this.teamForm.get('teams')?.value
          ),
      ],
    });
  }

  get teams(): FormArray {
    return this.teamForm.get('teams') as FormArray;
  }

  onFocusInput(index: number): void {
    if (index === this.teams.length - 1) {
      const teamGroup = this.teams.at(index) as FormGroup;
      teamGroup.get('name')?.setValidators(Validators.required);
      teamGroup.get('name')?.updateValueAndValidity();
      this.teams.push(this.createTeam());
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

  nextPage() {
    this.gameConfigService.setTeams(this.teamForm.get('teams')?.value);
    this.router.navigate(['/summary']);
  }
  previousPage() {
    this.router.navigate(['/words']);
  }
}
