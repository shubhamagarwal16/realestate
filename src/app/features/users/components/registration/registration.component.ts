import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../../../common/services/common.service';
import { RegistrationValidators } from '../../../../common/validators/registration.validators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private commonSerive: CommonService, 
    private registrationValidators: RegistrationValidators,
    private http: HttpClient
  ) { }

  registrationForm = new FormGroup({
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required], this.registrationValidators.checkEmailAvailability.bind(this.registrationValidators)), 
    phoneNo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required])
  }, { validators: this.registrationValidators.passwordMatch }
);

  stateList;
  private cityList = [];

  ngOnInit() {
    this.commonSerive.getStatelist()
    .subscribe(response => {
      // console.log('-- ', response, response['statelist']);
      // return response['statelist'];
      if(response['statelist']){
        this.stateList = response['statelist'];
      }
    });
    // console.log('---', getStateList);
  }
  
  getCityList(stateId){
    // console.log(' - stateID -- ', stateId);
    
    if(stateId != 0){
      this.commonSerive.getCitylistByState(stateId)
      .subscribe(response => {
        // console.log('-- ', response['citylist']);
        // return response['statelist'];
        if(response['citylist']){
          this.cityList = response['citylist'];
        }
      });
    }
    else{
      this.cityList = [];
    }
  }

  registration(data) {
    console.log(data);

    this.http.post(this.commonSerive.base_url + '/users/registration', data.value)
    .subscribe(response => {
      console.log('--- reg form -- ', response);      
    });
  }

  log(data) {
    console.log('--',data);
  }

// --------  Get fields for Form
  get fName() {
    return this.registrationForm.get('fName');
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
  get pinCode() {
    return this.registrationForm.get('pinCode');
  }
  get state() {
    return this.registrationForm.get('state');
  }
  get city() {
    return this.registrationForm.get('city');
  }
  get userType() {
    return this.registrationForm.get('userType');
  }

}
