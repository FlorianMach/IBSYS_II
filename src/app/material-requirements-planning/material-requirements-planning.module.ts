import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialRequirementsPlanningComponent } from './material-requirements-planning.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MaterialRequirementsPlanningComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [MaterialRequirementsPlanningComponent],
})
export class MaterialRequirementsPlanningModule {}
