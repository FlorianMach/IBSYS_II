import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { I18nModule } from '../shared/i18n/i18n.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    I18nModule,
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [ResultComponent],
})
export class ResultModule {}
