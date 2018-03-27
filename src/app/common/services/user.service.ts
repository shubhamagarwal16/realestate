import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class UserService {

  constructor() { }

  get currentUser(){
    var token = localStorage.getItem('token');
    if(!token) return null;
    
    let jwtHelper = new JwtHelper();
    console.log('decoded ', jwtHelper.decodeToken(token));
    
    return jwtHelper.decodeToken(token);
  }

}
