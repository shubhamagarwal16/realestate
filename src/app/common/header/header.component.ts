import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private loginService: LoginService) {}

  // ----- FORM

    loginError: boolean =  false;

  login(loginForm){
    console.log("form log", loginForm);
    
    let returnData = this.loginService.checkUserLogin(loginForm);
    if(returnData){
      console.log('service data', returnData);
      this.loginError = false;
    }
    else{
      this.loginError = true;
    }
  }
  
  log(data){
    console.log(data);
  }

  // ------------- LOGIN

  ngOnInit() {
  }

}
