import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard-main/dashboard.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { PropertyNewComponent } from './components/property/property-new/property-new.component';
import { ReUsableModule } from '../../common/re-usable.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule
  ],
  declarations: [RegistrationComponent, DashboardComponent, EditProfileComponent, DashboardHomeComponent, PropertyNewComponent],
  providers: [
  ]
})
export class UsersModule { }
