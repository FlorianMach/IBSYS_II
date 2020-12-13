import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { MatSliderModule } from '@angular/material/slider';
import { I18nModule } from '../shared/i18n/i18n.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    MatSliderModule,
    I18nModule,
    MatButtonModule
  ]
})
export class SplitDialogModule { }
