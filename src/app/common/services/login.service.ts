import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { CommonService } from './common.service';
import { JwtHelper } from "angular2-jwt";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'xsrfCookieName':  'csrftoken',
    // 'xsrfHeaderName': 'X-CSRFToken'
  })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
  private commonService: CommonService ) { }
 
  private url = this.commonService.base_url;
  
  checkUserLogin(data){       
    // return this.http.get(theUrl, JSON.stringify(data), httpOptions)
    let postData = { 'emailPhone': data.emailPhno, 'password': data.loginPassword }
    return this.http.post(this.url + '/auth/user/login', postData, httpOptions)    
  }

  isLoggedIn(){
    let jwtHelper = new JwtHelper();
    jwtHelper.getTokenExpirationDate('cskdsndssd8779999');
  }

}
