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
    private modalService: NgbModal  ) {}

  // ---- Login Modal
  private loginModalRef: NgbModalRef;

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

  loginError: any = {
    status : false,
    type: 'success',
    message : 'Default text'
  };
	  

  login(loginForm){
    // console.log("form log", loginForm.value);
    
    let returnData = this.loginService.checkUserLogin(loginForm.value)
    .subscribe( response => {
        console.log('== response - ', response, ' type of ', typeof response);
        
        if(response['status'] === 'success'){
          this.loginError = {
            type : 'success',
            status: true,
            message: 'Logged In successfully'
          }
          this.loginSuccess();
        }
        
    },
    (error: Response) => {
      this.loginError.type = 'danger';
      console.log('Unexpected error occured ', error);
      if(error.status === 401){
        this.loginError.message = "Either of you details is incorrect";
      }
      else{
        this.loginError.message = "An Unexpected error occured";
      }
      this.loginError.status = true;
    });
    // .subscribe( response => {
    //   console.log('response - ', response, ' type of ', typeof response);
    //   response = JSON.stringify(response);
    //   console.log('response - ', response, ' type of ', typeof response);

    //   if(response){
		//     this.loginError = false;
    //     this.loginModalRef.close(); // closing modal
    //     this.router.navigate(['/users/dashboard']);
    //   }
    //   else{
    //     this.loginError = true;
    //   }
    // });
  }

  loginSuccess(){
    this.loginModalRef.close(); // closing modal
    this.router.navigate(['/users/dashboard']);

  }
  
  log(data){
    // console.log(data);
  }

  // ------------- LOGIN

  ngOnInit() {
  }

}
