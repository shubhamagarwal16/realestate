import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReUsableModule } from '../../common/re-usable.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    ReUsableModule,
    FormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
