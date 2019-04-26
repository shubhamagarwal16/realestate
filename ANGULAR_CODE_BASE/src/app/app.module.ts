import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReUsableModule } from './common/re-usable.module';
import { AppRoutingModule } from './app-routing.module';
import { MatComponentsModule } from './mat-components.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CommonService } from './common/services/common.service';
import { UserService } from './common/services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReUsableModule,
    FormsModule,
    AppRoutingModule,
    MatComponentsModule,
    NgbModule.forRoot()
  ],
  exports: [
    FormsModule
  ],
  providers: [CommonService, UserService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
