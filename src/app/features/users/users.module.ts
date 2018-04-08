import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard-main/dashboard.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { ReUsableModule } from '../../common/re-usable.module';
import { PropertyNewComponent } from '../property/property-new/property-new.component';
import { FindPropertyComponent } from '../property/find-property/find-property.component';
import { PropertyListingComponent } from '../property/property-listing/property-listing.component';
import { EditPropertyComponent } from '../property/edit-property/edit-property.component';
import { PropertyMainComponent } from '../property/property-main/property-main.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule
  ],
  declarations: [
    RegistrationComponent,
    DashboardComponent,
    EditProfileComponent, 
    DashboardHomeComponent, 
    PropertyNewComponent, 
    FindPropertyComponent, 
    PropertyListingComponent, 
    EditPropertyComponent,
    PropertyMainComponent
  ],
  providers: [
  ]
})
export class UsersModule { }
