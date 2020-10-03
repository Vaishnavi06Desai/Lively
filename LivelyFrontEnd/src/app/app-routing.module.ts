import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AnimalwelfareComponent } from './animalwelfare/animalwelfare.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { FarmaffairsComponent } from './farmaffairs/farmaffairs.component';
import { FarmperformaceindexComponent } from './farmperformaceindex/farmperformaceindex.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HealthformComponent } from './healthform/healthform.component';
import { HealthhistoryComponent } from './healthhistory/healthhistory.component';
import { HealthsystemComponent } from './healthsystem/healthsystem.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryrecordComponent } from './inventoryrecord/inventoryrecord.component';
import { NewtypeComponent } from './newtype/newtype.component';
import { PdfComponent } from './pdf/pdf.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'forgot',
    component: ForgotpassComponent
  },
  {
    path: 'confirmemail',
    component: ConfirmemailComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'inventory/newrecord',
    component: InventoryrecordComponent
  },
  {
    path: 'inventory/newtype',
    component: NewtypeComponent
  },
  {
    path: 'farmaffairs',
    component: FarmaffairsComponent
  },
  {
    path: 'farmaffairs/fpi',
    component: FarmperformaceindexComponent
  },
  {
    path: 'animalwelfare',
    component: AnimalwelfareComponent
  },
  {
    path: 'animalwelfare/healthsystem',
    component: HealthsystemComponent
  },
  {
    path: 'animalwelfare/healthrecord',
    component: HealthformComponent
  },
  {
    path: 'animalwelfare/healthrecordhistory',
    component: HealthhistoryComponent
  },
  {
    path: 'animalwelfare/healthrecordhistory/pdf',
    component: PdfComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
