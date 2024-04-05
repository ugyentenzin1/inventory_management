import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import {ENVIROMENT} from '../../../../enviroment'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(ENVIROMENT.firebaseConfig)),
    ])
  ],
};
