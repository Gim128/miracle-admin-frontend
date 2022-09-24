import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
// import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
    }),
  ],
  providers: []
})
export class AppBrowserModule {}
