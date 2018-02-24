import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginService } from './services/login.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    LoginService
  ]
})
export class ReUsableModule { }
