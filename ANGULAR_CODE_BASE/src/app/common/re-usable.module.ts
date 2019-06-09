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
import { SmallComponentsComponent } from './components/small-components/small-components.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { MatComponentsModule } from '../mat-components.module';
import { DashboardComponent } from './components/dashboard-main/dashboard.component';
import { InputFormatDirective } from './directives/input-format.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatComponentsModule
    
    // HttpClientXsrfModule.withOptions({
    //   cookieName: 'csrftoken',
    //   headerName: 'X-CSRFToken',
    // })
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    PropertylistComponent,
    SmallComponentsComponent,
    NotFoundComponent,
    LoginModalComponent,
    InputFormatDirective
  ],
  exports: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    PropertylistComponent,
    SmallComponentsComponent,
    NotFoundComponent,
    InputFormatDirective
  ],
  providers: [
    LoginService,
    RegistrationValidators,
    AuthGuardService
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class ReUsableModule { }
