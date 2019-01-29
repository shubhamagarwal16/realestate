import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './users/components/dashboard/dashboard-main/dashboard.component';
import { EditProfileComponent } from './users/components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './users/components/dashboard/dashboard-home/dashboard-home.component';
import { AuthGuardService } from '../common/services/auth-guard.service';
import { PropertyNewComponent } from './property/property-new/property-new.component';
import { FindPropertyComponent } from './property/find-property/find-property.component';
import { PropertyListingComponent } from './property/property-listing/property-listing.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { PropertyMainComponent } from './property/property-main/property-main.component';
import { PropertyViewComponent } from './property/property-view/property-view.component';
import { RegistrationComponent } from './users/registration/registration.component';

const Routes: Routes = [
  {
    path: 'sign-up', 
    component: RegistrationComponent
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'property',
    component: DashboardComponent,
    children: [
      {
        path: 'new',
        component: PropertyNewComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'search',
        component: FindPropertyComponent
      },
      {
        path: 'listing',
        component: PropertyMainComponent,
        children: [
          {
            path: 'all',
            component: PropertyListingComponent,
            data: { data: 'all' }
          },
          {
            path: 'active',
            component: PropertyListingComponent,
            data: { data: 'available' }
          },
          {
            path: 'sold',
            component: PropertyListingComponent,
            data: { data: 'sold' }
          },
          {
            path: 'inactive',
            component: PropertyListingComponent,
            data: { data: 'expired' }
          },
          {
            path: '',
            redirectTo: 'all'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit/:propertyId',
        component: EditPropertyComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'view/:propertyId',
        component: PropertyViewComponent
      },
      {
        path: '',
        redirectTo: 'new'
      }
    ]    
  },
  {
    path: 'profile',
    component: DashboardComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent
      }
    ],
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class FeaturesRoutingModule { }
