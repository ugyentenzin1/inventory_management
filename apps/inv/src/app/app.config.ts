import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { provideRouter } from '@angular/router';

import {ENVIROMENT} from '../../../../enviroment'
import { coreRouets } from './core/core.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(coreRouets),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(ENVIROMENT.firebaseConfig)),
    ])
  ],
};
