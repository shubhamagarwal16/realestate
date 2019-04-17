import { NgModule } from '@angular/core';
import {MatMenuModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  exports: [ MatMenuModule, MatProgressSpinnerModule ]
})
export class MatComponentsModule { }
