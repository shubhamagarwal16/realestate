import { NgModule } from '@angular/core';
import {MatMenuModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';

@NgModule({
  exports: [ MatMenuModule, MatProgressSpinnerModule, MatTooltipModule ]
})
export class MatComponentsModule { }
