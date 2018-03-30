import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard-main/dashboard.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { PropertyNewComponent } from './components/property/property-new/property-new.component';
import { FindPropertyComponent } from './components/property/find-property/find-property.component';

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
    ]
  },
  {
    path: 'property',
    component: DashboardComponent,
    children: [
      {
        path: 'new',
        component: PropertyNewComponent
      },
      {
        path: 'search',
        component: FindPropertyComponent
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
    ]
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
export class UserRoutingModule { }
