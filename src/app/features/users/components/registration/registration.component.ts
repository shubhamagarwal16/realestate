import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../../../common/services/common.service';
import { RegistrationValidators } from '../../../../common/validators/registration.validators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private commonSerive: CommonService, 
    private registrationValidators: RegistrationValidators,
    private http: HttpClient,
    private router: Router
  ) { }

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    // lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required], this.registrationValidators.checkEmailAvailability.bind(this.registrationValidators)), 
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl('', [Validators.required])
  }, 
  { validators: this.registrationValidators.passwordMatch } );

  mainErrorMessage = {
    type: '',
    message: ''
  }

  ngOnInit() {
  }

  registration(data) {
    console.log(data);
    this.router.navigate(['/'],{
      queryParams: { action: 'signUpsuccess' }
    });
    // this.http.post(this.commonSerive.base_url + '/users/registration', data.value)
    // .subscribe(response => {
    //   console.log('--- reg form -- ', response, response['email'], data.value['email']); 
    //   if(response['email'] === data.value['email']){
    //     this.router.navigate(['/?action=signUpsuccess']);
    //   }
    // },
    // (error: Response) => {
    //   this.mainErrorMessage.type = 'danger';

    //   if(error.status === 400 ){
    //     this.mainErrorMessage.message = error.statusText;
    //   }
    //   else if(error.status){
    //     this.mainErrorMessage.message = 'Something went wrong';
    //   }
    // });
  }

  log(data) {
    console.log('--',data);
  }

// --------  Get fields for Form
  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get registrationPassword() {
    return this.registrationForm.get('password');
  }
  get registrationcPassword() {
    return this.registrationForm.get('cPassword');
  }

}
