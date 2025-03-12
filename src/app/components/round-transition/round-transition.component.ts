import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-round-transition',
  templateUrl: './round-transition.component.html',
  styleUrls: ['./round-transition.component.scss'],
})
export class RoundTransitionComponent {
  constructor(public dialogRef: MatDialogRef<RoundTransitionComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
