import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  alertMessage: any = {
    // status: false,
    type: '',
    message: ''
  };
  urltoRedirect = '';
  loginCheck = false;

  login(loginForm) {
    console.log('loginform ', loginForm);
    this.loginCheck = true;
    let returnData = this.loginService.checkUserLogin(loginForm.value)
    .subscribe(response => {
      console.log('== response - ', response, ' type of ', response['token']);

      if (response['token'] !== '') {
        this.alertMessage = {
          type: 'success',
          status: true,
          message: 'Logged In successfully'
        }
        this.loginCheck = false;
        this.alertMessage.message = '';
        this.loginSuccess(response['token']);
      }
    },
    (error: Response) => {
      this.alertMessage.type = 'danger';
      this.loginCheck = false;
      console.log('Unexpected error occured ', error);
      if (error.status === 401) {
        this.alertMessage.message = "Either of you details is incorrect";
      }
      else {
        this.alertMessage.message = "An Unexpected error occured";
      }
      // this.loginError.status = true;
    });
  }

  loginSuccess(token) {
    this.commonService.changeHeaderMessage({ type: 'success', message: 'You have logged in successfully'});
    this.activeModal.dismiss('Cross click');
    this.router.navigate([this.urltoRedirect || '/users/dashboard']);
    
    // if (this.urltoRedirect)
    //   this.router.navigate([this.urltoRedirect]);
    // else
    //   this.router.navigate(['/users/dashboard']);

    // Adding to local storage
    localStorage.setItem('token', token);

  }


  ngOnInit() {
    this.route.queryParamMap.subscribe((data) => {
      // console.log('--- ', data);
      if (data.get('action') === 'signUpsuccess') 
        this.alertMessage = { status: true, type: 'success', message: 'Please login to continue' }
      else if (data.get('action') === 'login') 
        this.alertMessage = { status: true, type: 'success', message: 'Please login to continue' }

      if (data.get('urltoRedirect') != '')
        this.urltoRedirect = data.get('urltoRedirect');      
    });      
  }

}
