import { NgModule } from '@angular/core';

import { MatCheckboxModule,
  MatDialogModule
 } from '@angular/material';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule
  ]
})
export class MatComponentsModule { }
