import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '../shared/i18n/i18n.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ProcurementComponent],
  imports: [CommonModule, FormsModule, I18nModule, BrowserModule],
  exports: [ProcurementComponent],
})
export class ProcurementModule { }
