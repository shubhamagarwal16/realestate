import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientXsrfModule, HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginService } from './services/login.service';
import { RegistrationValidators } from './validators/registration.validators';
import { PropertylistComponent } from './components/propertylist/propertylist.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({
    //   cookieName: 'csrftoken',
    //   headerName: 'X-CSRFToken',
    // })
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PropertylistComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PropertylistComponent
  ],
  providers: [
    LoginService,
    RegistrationValidators
  ]
})
export class ReUsableModule { }
