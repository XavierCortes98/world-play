import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      rounds: 0,
      time: '',
      words: 0,
    });
  }

  incrementRounds() {
    let value = this.settingsForm.get('rounds')?.value || 0;
    this.settingsForm.get('rounds')?.setValue(value + 1);
  }

  decrementRounds() {
    let value = this.settingsForm.get('rounds')?.value || 0;
    this.settingsForm.get('rounds')?.setValue(value - 1);
  }
}
