import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductPlanningComponent } from './product-planning.component';
import { MatTabsModule } from '@angular/material/tabs';
import { I18nModule } from '../shared/i18n/i18n.module';

@NgModule({
  declarations: [ProductPlanningComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    I18nModule
  ],
  exports: [ProductPlanningComponent],
})
export class ProductPlanningModule {}
