import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required]),
  });

  registration(data){
    console.log(data);
  }

  log(data){
    console.log(data);
  }

}
