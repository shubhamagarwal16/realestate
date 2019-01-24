import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';

import { DashboardComponent } from './users/components/dashboard/dashboard-main/dashboard.component';
import { EditProfileComponent } from './users/components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './users/components/dashboard/dashboard-home/dashboard-home.component';
import { ReUsableModule } from '../common/re-usable.module';
import { PropertyNewComponent } from './property/property-new/property-new.component';
import { FindPropertyComponent } from './property/find-property/find-property.component';
import { PropertyListingComponent } from './property/property-listing/property-listing.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { PropertyMainComponent } from './property/property-main/property-main.component';
import { PropertyViewComponent } from './property/property-view/property-view.component';
import { RegistrationComponent } from './users/registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
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
    PropertyMainComponent,
    PropertyViewComponent
  ],
  providers: [
  ]
})
export class FeaturesModule { }
