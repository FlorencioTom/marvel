import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi, withJsonpSupport, withNoXsrfProtection} from '@angular/common/http';

import { TranslateLoader as NgxTranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translationEsEn } from '../assets/i18n/es_En';
import { Observable, of } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const TRANSLATIONS: any = {
  EsEn: translationEsEn

};

export class TranslateLoader implements NgxTranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang]);
  }
}

export function translateFactory() {
  return new TranslateLoader();
}

export const appConfig: ApplicationConfig = {
  providers: 
            [
              provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideClientHydration(),
              provideHttpClient(
                withFetch(),
                withInterceptorsFromDi(),
                withJsonpSupport(),
                withNoXsrfProtection()
              ),
              importProvidersFrom(TranslateModule.forRoot({
                defaultLanguage: 'EsEn',
                loader: {
                  provide: NgxTranslateLoader,
                  useFactory: translateFactory,
                  deps: [HttpClient]
                }
              })), provideAnimationsAsync()
            ]
};
