import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: MainComponent
//   }
// ]

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/home/home.module#HomeModule'
      }
    ]
  },
  {
    path: 'property',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/property/property.module#PropertyModule'
      }
    ]
  },
  {
    path: 'users',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/features.module#FeaturesModule'
      }
    ]
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/admin/admin.module#AdminModule'
      }
    ],
    data: {isAdmin : true}
  },
  {
    path: '**',
    component: NotFoundComponent,

  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes //, {enableTracing: true} 
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
