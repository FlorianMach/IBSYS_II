import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductPlanningComponent } from './product-planning.component';
import { MatTabsModule } from '@angular/material/tabs';
import { I18nModule } from '../shared/i18n/i18n.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ProductPlanningComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    MatTabsModule,
    I18nModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule
],
  exports: [ProductPlanningComponent],
})
export class ProductPlanningModule { }
