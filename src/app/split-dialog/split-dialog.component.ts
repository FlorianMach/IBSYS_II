import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import { element } from 'protractor';

@Component({
  selector: 'app-split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrls: ['./split-dialog.component.scss'],
})
export class SplitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SplitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() {
    this.data.rest1 = 1;
    this.data.rest2 = (this.data.quantity - 1);
  }

  /*
  formatLabel(value: number) {
    return value;
  }
  */

  negativeValue(): boolean {
    if(this.data.rest1 <= 0 || this.data.rest2 <= 0 || this.data.rest1 > (this.data.quantity - 1)) return true;
    else return false;
  }

  calculate(event: any) {
    this.data.rest2 = (this.data.quantity - event.target.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
