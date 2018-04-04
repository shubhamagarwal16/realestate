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

  loginError: any = {
    status: false,
    type: 'success',
    message: 'Default text'
  };
  urltoRedirect = '';

  login(loginForm) {
    console.log('loginform ', loginForm);

    let returnData = this.loginService.checkUserLogin(loginForm.value)
    .subscribe(response => {
      console.log('== response - ', response, ' type of ', response['token']);

      if (response['token'] !== '') {
        this.loginError = {
          type: 'success',
          status: true,
          message: 'Logged In successfully'
        }
        this.loginSuccess(response['token']);
      }
    },
    (error: Response) => {
      this.loginError.type = 'danger';
      console.log('Unexpected error occured ', error);
      if (error.status === 401) {
        this.loginError.message = "Either of you details is incorrect";
      }
      else {
        this.loginError.message = "An Unexpected error occured";
      }
      this.loginError.status = true;
    });
  }

  loginSuccess(token) {
    this.commonService.changeHeaderMessage({ type: 'success', message: 'You have logged in successfully'});
    this.activeModal.dismiss('Cross click');
    if (this.urltoRedirect)
      this.router.navigate([this.urltoRedirect]);
    else
      this.router.navigate(['/users/dashboard']);

    // Adding to local storage
    localStorage.setItem('token', token);

  }


  ngOnInit() {
    console.log('erking');

    this.route.queryParamMap.subscribe((data) => {
      // console.log('--- ', data);
      if (data.get('action') === 'signUpsuccess') {
        // this.loginError = { status: true, type: 'success', message: 'Please login to continue' }
        // this.changeHeaderMessage('success', 'Congratulations, you have been successfully registered, login to continue');
        // this.openloginModal(this.content);
      }
      else if (data.get('action') === 'logOut') {
        // this.changeHeaderMessage('success', 'You have logged out successfully');
        // this.openloginModal(this.content);
      }
      if (data.get('urltoRedirect') != '') {
        this.urltoRedirect = data.get('urltoRedirect');
      }
    });      
  }

}
