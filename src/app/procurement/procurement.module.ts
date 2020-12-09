import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '../shared/i18n/i18n.module';

@NgModule({
  declarations: [ProcurementComponent],
  imports: [CommonModule, FormsModule, I18nModule],
  exports: [ProcurementComponent],
})
export class ProcurementModule { }
