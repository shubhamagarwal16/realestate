import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const Routes: Routes = [
  {
    path: 'sign-up', 
    component: RegistrationComponent
  },
  {
    path: 'dashboard', 
    component: DashboardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes)
  ],
  declarations: []
})
export class UserRoutingModule { }
