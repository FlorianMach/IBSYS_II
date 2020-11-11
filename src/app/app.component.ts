import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { onInitAnimate } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onInitAnimate],
})
export class AppComponent implements OnInit {
  init = false;
  language = 'en';
  // dummy for demonstration how to use variables in i18n context
  param = { value: 'Test' };

  ngOnInit(): void {
    this.initLanguageService();
    setTimeout(() => (this.init = !this.init));
  }

  constructor(public translate: TranslateService) {}

  private initLanguageService(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(this.language);

    this.translate.addLangs(['en', 'de']);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }
}
