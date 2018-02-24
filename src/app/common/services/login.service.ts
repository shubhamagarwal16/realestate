import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class LoginService {

  url = 'http://127.0.0.1:8000';

  constructor(private http: Http) { }

  checkUserLogin(data){
    console.log("-- service data ", data);
    
    let theUrl = this.url + '/users/user-login/';
    this.http.post(theUrl, JSON.stringify(data))
      .subscribe( respose => {
        console.log(' return data ', respose, ' of type ', typeof respose);        
        return respose;
      });
  }

}
