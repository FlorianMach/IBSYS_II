import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProcurementComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProcurementComponent],
})
export class ProcurementModule { }
