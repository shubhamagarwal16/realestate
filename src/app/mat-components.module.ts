import { NgModule } from '@angular/core';

import { MatCheckboxModule,
  MatDialogModule
 } from '@angular/material';

 import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class MatComponentsModule { }
