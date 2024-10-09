import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-collect-money-dialog',
  templateUrl: './collect-money-dialog.component.html',
  styleUrl: './collect-money-dialog.component.css'
})
export class CollectMoneyDialogComponent {
  constructor(public dialogRef: MatDialogRef<CollectMoneyDialogComponent>) {}

  confirmarCobro(): void {
    this.dialogRef.close(true); // Confirmar el cobro
  }
}
