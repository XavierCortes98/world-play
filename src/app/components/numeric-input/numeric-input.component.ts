import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss'],
})
export class NumericInputComponent {
  @Input() label = '';
  @Input() value = 1;
  @Input() step = 1;
  @Input() min = 1;
  @Input() inputId = 'default-id';

  @Output() valueChange = new EventEmitter<number>();

  decrement() {
    if (this.value > this.min) {
      this.value -= this.step;
      this.valueChange.emit(this.value);
    }
  }

  increment() {
    this.value += this.step;
    this.valueChange.emit(this.value);
  }
}
