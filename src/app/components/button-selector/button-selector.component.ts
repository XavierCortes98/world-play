import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-selector',
  templateUrl: './button-selector.component.html',
  styleUrls: ['./button-selector.component.scss'],
})
export class ButtonSelectorComponent {
  @Input() defaultValue: number = 0;
  @Input() title!: string;
  @Input() buttonsValues!: number[];
  @Input() nextPageRoute!: string;
  @Input() prevPageRoute!: string;

  @Output() valueSelected = new EventEmitter<number>();

  constructor(private router: Router) {}

  emitValue(value: number) {
    this.defaultValue = value;
    this.valueSelected.emit(value);
  }

  nextPage() {
    this.router.navigate([this.nextPageRoute]);
  }
  prevPage() {
    this.router.navigate([this.prevPageRoute]);
  }
}
