import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  private loginModalRef: NgbModalRef;
  // ---- Login Modal

  openloginModal(content) {
    this.loginModalRef = this.modalService.open(content);
    this.loginModalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  // ---- Login Modal

  // ----- FORM

    loginError: boolean =  false;
	  

  login(loginForm){
    // console.log("form log", loginForm.value);
    
    let returnData = this.loginService.checkUserLogin(loginForm.value)// JSON.stringify(loginForm.value));
    .subscribe( response => {
      console.log('response - ', response, ' type of ', typeof response);
      response = JSON.stringify(response);
      console.log('response - ', response, ' type of ', typeof response);

      if(response){
		    this.loginError = false;
        this.loginModalRef.close(); // closing modal
        this.router.navigate(['/users/dashboard']);
      }
      else{
        this.loginError = true;
      }
    });

  }
  
  log(data){
    console.log(data);
  }

  // ------------- LOGIN

  ngOnInit() {
  }

}
