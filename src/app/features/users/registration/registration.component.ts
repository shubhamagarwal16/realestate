import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';
import { RegistrationValidators } from '../../../common/validators/registration.validators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private commonService: CommonService, 
    private registrationValidators: RegistrationValidators,
    private http: HttpClient,
    private router: Router
  ) { }

  registrationForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required], this.registrationValidators.checkEmailAvailability.bind(this.registrationValidators)), 
    phoneNo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    user_type: new FormControl('', [Validators.required])
  }, { validators: this.registrationValidators.passwordMatch }
);

  mainErrorMessage = {
    type: '',
    message: ''
  }

  stateList;
  private cityList = [];

  ngOnInit() {
    this.commonService.togglePageLoaderFn(false);
    this.commonService.getStatelist()
    .subscribe(response => {
      if(response.length > 0){
        this.stateList = response;
      }
    });
  }
  
  getCityList(stateId){
    // console.log(' - stateID -- ', stateId);
    this.cityList = [];

    if(stateId != 0){
      this.commonService.getCitylistByState(stateId)
      .subscribe(response => {
        // console.log('-- ', response['citylist']);
        // return response['statelist'];
        if(response.length > 0){
          this.cityList = response;
        }
      });
    }
    else{
      this.cityList = [];
    }
  }

  registration(data) {
    console.log(data);
    // this.router.navigate(['/'],{
    //   queryParams: { action: 'signUpsuccess' }
    // });
    this.http.post(this.commonService.base_url + '/auth/user/register', data.value)
    .subscribe(response => {
      console.log('--- reg form -- ', response); 
      if(response && response['message']){
        this.router.navigate(['/'], {
          queryParams: { action: 'signUpsuccess' }
        });
      }
    },
    (error: Response) => {
      this.mainErrorMessage.type = 'danger';

      if(error.status === 400 ){
        this.mainErrorMessage.message = 'Your request is invalid';
      }
      else if(error.status){
        this.mainErrorMessage.message = 'Something went wrong';
      }
    });
  }

  log(data) {
    // console.log('--',data);
  }

  // --------  Get fields for Form
  get fname() {
    return this.registrationForm.get('fname');
  }
  get lName() {
    return this.registrationForm.get('lName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phoneNo() {
    return this.registrationForm.get('phoneNo');
  }
  get registrationPassword() {
    return this.registrationForm.get('password');
  }
  get registrationcPassword() {
    return this.registrationForm.get('cPassword');
  }
  get pincode() {
    return this.registrationForm.get('pincode');
  }
  get state() {
    return this.registrationForm.get('state');
  }
  get city() {
    return this.registrationForm.get('city');
  }
  get user_type() {
    return this.registrationForm.get('user_type');
  }

}
