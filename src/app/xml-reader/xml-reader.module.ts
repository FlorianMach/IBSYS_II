import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XmlReaderComponent } from './xml-reader.component';
import { I18nModule } from '../shared/i18n/i18n.module';

@NgModule({
  declarations: [XmlReaderComponent],
  imports: [CommonModule, I18nModule],
  exports: [XmlReaderComponent],
})
export class XmlReaderModule {}
