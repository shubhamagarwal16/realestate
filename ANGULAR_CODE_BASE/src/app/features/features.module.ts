import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditProfileComponent } from './users/components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './users/components/dashboard/dashboard-home/dashboard-home.component';
import { ReUsableModule } from '../common/re-usable.module';
import { RegistrationComponent } from './users/registration/registration.component';
import { FeaturesRoutingModule } from './users/features-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    FeaturesRoutingModule
  ],
  declarations: [
    RegistrationComponent,
    EditProfileComponent, 
    DashboardHomeComponent    
  ],
  providers: [
  ]
})
export class FeaturesModule { }
