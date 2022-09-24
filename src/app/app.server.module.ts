import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { readFileSync } from 'fs';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

export function translationLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return Observable.create((observer: Observer<any>) => {
        observer.next(JSON.parse(readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8')));
        observer.complete();
      });
    }
  } as TranslateLoader;
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useFactory: translationLoader }
    })
],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
