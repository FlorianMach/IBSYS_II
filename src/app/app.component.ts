import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { onInitAnimate } from './app.animations';
import { ProcurementComponent } from './procurement/procurement.component';
import {
  bomDetailedP1,
  bomDetailedP2,
  bomDetailedP3,
} from './shared/const/bom';
import { XmlReaderService } from './xml-reader/xml-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onInitAnimate],
})
export class AppComponent implements OnInit {
  init = false;
  language = 'en';
  mrp2psns;
  // dummy for demonstration how to use variables in i18n context
  param = { value: 'Test' };
  @ViewChild(ProcurementComponent) ProcurementComponent: ProcurementComponent;
  xmlData: any;


  ngOnInit(): void {
    this.initLanguageService();
    setTimeout(() => (this.init = !this.init));
    this.xmlReaderService.subscribe((data) => {
      this.xmlData = data;
    });
  }

  get bomP1() {
    return bomDetailedP1;
  }

  get bomP2() {
    return bomDetailedP2;
  }

  get bomP3() {
    return bomDetailedP3;
  }

  constructor(
    public translate: TranslateService,
    public xmlReaderService: XmlReaderService
  ) {}

  private initLanguageService(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(this.language);

    this.translate.addLangs(['en', 'de']);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }
  onProductDataChanged(event) {
    this.mrp2psns = event;
  }
}
