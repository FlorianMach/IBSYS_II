import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeatureModule } from './shared/feature/feature.module';
import { I18nModule } from './shared/i18n/i18n.module';
import { MaterialModule } from './shared/material/material.module';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';

@NgModule({
  declarations: [AppComponent, WarningDialogComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FeatureModule,
    FormsModule,
    MaterialModule,
    I18nModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
