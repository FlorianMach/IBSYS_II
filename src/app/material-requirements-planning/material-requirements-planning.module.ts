import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialRequirementsPlanningComponent } from './material-requirements-planning.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '../shared/i18n/i18n.module';

@NgModule({
  declarations: [MaterialRequirementsPlanningComponent],
  imports: [CommonModule, MaterialModule, FormsModule, I18nModule],
  exports: [MaterialRequirementsPlanningComponent],
})
export class MaterialRequirementsPlanningModule {}
