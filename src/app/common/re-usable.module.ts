import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientXsrfModule, HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegistrationValidators } from './validators/registration.validators';
import { PropertylistComponent } from './components/propertylist/propertylist.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


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
    PropertylistComponent,
    PageLoaderComponent,
    NotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PropertylistComponent,
    PageLoaderComponent,
    NotFoundComponent
  ],
  providers: [
    LoginService,
    RegistrationValidators,
    AuthGuardService
  ]
})
export class ReUsableModule { }
