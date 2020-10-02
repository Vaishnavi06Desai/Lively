import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import * as Hammer from 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryrecordComponent } from './inventoryrecord/inventoryrecord.component';

import {MatSelectModule} from '@angular/material/select';
import { NewtypeComponent } from './newtype/newtype.component';
import { FarmaffairsComponent } from './farmaffairs/farmaffairs.component';
import { FarmperformaceindexComponent } from './farmperformaceindex/farmperformaceindex.component';


//import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
//import { ApiAiClient } from 'api-ai-javascript';


@Injectable({providedIn: 'root'})
export class HammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-y",
    });
    return mc;
  }
} 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ForgotpassComponent,
    ConfirmemailComponent,
    AboutusComponent,
    InventoryComponent,
    InventoryrecordComponent,
    NewtypeComponent,
    FarmaffairsComponent,
    FarmperformaceindexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HammerModule,

    MatSidenavModule,
    MatSelectModule,

    //ApiAiClient,

    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Lively'),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule,
    //AngularFireAuth,

    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
