import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    // children: [
    //   {
    //     path: '',
    //   }
    // ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    AdminDashboardComponent,
    AdminMainComponent
  ]
})
export class AdminModule { }
