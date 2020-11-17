import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [ResultComponent],
})
export class ResultModule {}
