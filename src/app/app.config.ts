// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase.config'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [                                              /* cosas de firebase */
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Configuración de Firebase como standalone
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
