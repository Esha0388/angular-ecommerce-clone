import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from './app/firebase-config';

bootstrapApplication(App, {
  ...appConfig,  // keep your existing providers
  providers: [
    ...(appConfig.providers || []),  // merge existing providers
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
})
.catch((err) => console.error(err));