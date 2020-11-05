import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductPlanningComponent } from './product-planning.component';

@NgModule({
  declarations: [ProductPlanningComponent],
  imports: [CommonModule],
  exports: [ProductPlanningComponent],
})
export class ProductPlanningModule {}
