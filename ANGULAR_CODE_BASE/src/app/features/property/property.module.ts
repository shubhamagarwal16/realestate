import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReUsableModule } from './../../common/re-usable.module';
import { MatComponentsModule } from '../../mat-components.module';

import { PropertyViewComponent } from './property-view/property-view.component';
import { PropertyNewComponent } from './property-new/property-new.component';
import { FindPropertyComponent } from './find-property/find-property.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyMainComponent } from './property-main/property-main.component';

@NgModule({
  declarations: [
    PropertyNewComponent, 
    FindPropertyComponent, 
    PropertyListingComponent, 
    EditPropertyComponent,
    PropertyMainComponent,
    PropertyViewComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    CommonModule,
    PropertyRoutingModule,
    MatComponentsModule
  ]
})
export class PropertyModule { }
