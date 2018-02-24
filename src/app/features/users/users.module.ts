import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ],
  declarations: [RegistrationComponent, DashboardComponent]
})
export class UsersModule { }
