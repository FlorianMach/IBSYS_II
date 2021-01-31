import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityPlanningComponent } from './capacity-planning.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { I18nModule } from '../shared/i18n/i18n.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CapacityPlanningComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    I18nModule,
  ],
  exports: [CapacityPlanningComponent],
})
export class CapacityPlanningModule {}
