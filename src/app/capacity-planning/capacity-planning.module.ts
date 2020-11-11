import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityPlanningComponent } from './capacity-planning.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [CapacityPlanningComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule
  ],
  exports: [CapacityPlanningComponent],
})
export class CapacityPlanningModule {}
