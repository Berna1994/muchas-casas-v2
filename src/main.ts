import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseProviders } from './app/firebase-component/firebase-init';

bootstrapApplication(AppComponent, {
  providers: [
    ...firebaseProviders,
  ],
}).catch(err => console.error(err));
