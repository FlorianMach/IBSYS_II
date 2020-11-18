import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { I18nModule } from '../shared/i18n/i18n.module';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    I18nModule
  ],
  exports: [ResultComponent],
})
export class ResultModule {}
