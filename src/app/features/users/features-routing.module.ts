import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { AuthGuardService } from '../../common/services/auth-guard.service';
import { DashboardComponent } from '../../common/components/dashboard-main/dashboard.component';

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
