import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductPlanningComponent } from './product-planning.component';

@NgModule({
  declarations: [ProductPlanningComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProductPlanningComponent],
})
export class ProductPlanningModule { }
