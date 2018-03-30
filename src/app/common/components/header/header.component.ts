import { Component, OnInit, Input } from '@angular/core';
// , ViewChild
import { Router, ActivatedRoute } from '@angular/router';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal  ) {}

  // ---- Login Modal
  private loginModalRef: NgbModalRef;

  openloginModal(content) {
    this.loginModalRef = this.modalService.open(content);
    this.loginModalRef.result.then((result) => { }, (reason) => { });
  }
  // ---- Login Modal

  // ----- FORM

  headerDropdown: false;

  loginError: any = {
    status : false,
    type: 'success',
    message : 'Default text'
  };
	  
  login(loginForm){ 
    console.log('loginform ', loginForm);
       
    let returnData = this.loginService.checkUserLogin(loginForm.value)
    .subscribe( response => {
      console.log('== response - ', response, ' type of ', response['token']);
        
        if(response['token'] !== ''){
          this.loginError = {
            type : 'success',
            status: true,
            message: 'Logged In successfully'
          }
          this.loginSuccess(response['token']);
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
  }

  loginSuccess(token){
    this.loginModalRef.close(); // closing modal

    this.changeHeaderMessage('success', 'You have logged in successfully');

    this.router.navigate(['/users/dashboard']);

    // Adding to local storage
    localStorage.setItem('token', token);

  }
  
  log(data){
    // console.log(data);
  }

  // ------------- LOGIN

  // Main header alert message
  HeaderMessage = {
    type: '',
    message: ''
  }

  closeHeaderMessage(){
    this.HeaderMessage.message = '';    
  }

  changeHeaderMessage(type, message){
    console.log('changeHeaderMessage');
    
    this.HeaderMessage = { type: type, message: message }
    var self = this;
    setTimeout(function(){
      self.closeHeaderMessage();
    }, 5000);
  }


  ngOnInit() {
    // this.closeHeaderMessage();
    // console.log('header init- ');
    
    this.route.queryParamMap.subscribe((data)=>{
      // console.log('--- ', data);
      if(data.get('action') === 'signUpsuccess'){
        this.loginError = { status: true, type: 'success', message: 'Please login to continue' }
        this.changeHeaderMessage('success', 'Congratulations, you have been successfully registered, login to continue');
        // this.openloginModal(this.content);
      }
      else if (data.get('action') === 'logOut'){
        this.changeHeaderMessage('success', 'You have logged out successfully');
        // this.openloginModal(this.content);
      }
    });
  }



}
