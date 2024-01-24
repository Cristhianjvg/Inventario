import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ModulesModule } from './modules/modules.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModulesModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"bodega-1ec64","appId":"1:203597361338:web:c08eb9463b0226e5acd283","storageBucket":"bodega-1ec64.appspot.com","apiKey":"AIzaSyAnkDUVwSsl4UDK47X4gS6qYqhWYUVP7h8","authDomain":"bodega-1ec64.firebaseapp.com","messagingSenderId":"203597361338"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
