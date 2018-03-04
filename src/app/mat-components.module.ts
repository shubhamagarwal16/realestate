import { NgModule } from '@angular/core';

import { MatCheckboxModule,
  MatDialogModule
 } from '@angular/material';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class MatComponentsModule { }
