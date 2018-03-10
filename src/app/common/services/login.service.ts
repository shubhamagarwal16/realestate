import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'xsrfCookieName':  'csrftoken',
    // 'xsrfHeaderName': 'X-CSRFToken'
  })
};

@Injectable()
export class LoginService {

  url = 'http://127.0.0.1:8000';
  
  constructor(private http: HttpClient) { }
  
  checkUserLogin(data){
    console.log("-- service data ", data);
    
    let theUrl = this.url + '/users/test' //'/users/user-login/';

    // return this.http.get(theUrl, JSON.stringify(data), httpOptions)

    data = { 'name': 'testzxzxzxzx' }
    return this.http.post(theUrl, JSON.stringify(data), httpOptions)
    // .subscribe( response => {
    //     response = JSON.stringify(response);
    //     console.log('response - ', response, ' type of ', typeof response);
    //     return response;
    // });
  }

}
